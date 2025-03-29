from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import json
from django.http import FileResponse, JsonResponse
import numpy as np
import threading
import time
import keras
import keras_nlp
import os
import logging

logging.basicConfig(level=logging.INFO)  # Configure logging

os.environ["KAGGLE_USERNAME"] = "mahdertesfayeabebe"
os.environ["KAGGLE_KEY"] = "f6e473812b3e56ea76cfa09f6979bf6c"

# Shared data structure for training metrics (thread-safe)
training_status = {
    'loss': None,
    'accuracy': None,
    'val_loss': None,
    'val_accuracy': None,
    'current_batch': 0,
    'current_epoch': 0,
    'is_training': False,
    'message': None,
    'model_url': None,
    'training_loss': None,
    'training_accuracy': None,
    'Training_accuracy_at_epoch': None,
    'Training_loss_at_epoch': None,
    'batches_per_epoch': None,
}

training_lock = threading.Lock()


class BatchLossLogger(keras.callbacks.Callback):
    def __init__(self):
        super().__init__()

    def on_train_batch_end(self, batch, logs=None):
        with training_lock:
            training_status['loss'] = logs.get('loss')
            training_status['accuracy'] = logs.get('accuracy')
            training_status['current_batch'] = batch

    def on_epoch_end(self, epoch, logs=None):
        with training_lock:
            training_status['current_epoch'] = epoch
            training_status['val_loss'] = logs.get('val_loss')
            training_status['val_accuracy'] = logs.get('val_accuracy')
            training_status['Training_accuracy_at_epoch'] = logs.get('accuracy')
            training_status['Training_loss_at_epoch'] = logs.get('loss')


def train_model_thread(data, uploaded_file):
    global training_status

    with training_lock:
        training_status['is_training'] = True
        training_status['message'] = "Training started"
        training_status['loss'] = None
        training_status['accuracy'] = None
        training_status['val_loss'] = None
        training_status['val_accuracy'] = None
        training_status['current_batch'] = None
        training_status['current_epoch'] = None
        training_status['Training_accuracy_at_epoch'] = None
        training_status['Training_loss_at_epoch'] = None
        training_status['model_url'] = None
        training_status['batches_per_epoch'] = None

    try:
        logging.info("Starting training...")
        if data['model_type'] == 'gemma2b':
            gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_2b_en")
        elif data['model_type'] == 'gemma9b':
            gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_9b_en")
        elif data['model_type'] == 'gemma27b':
            gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_27b_en")
        else:
            with training_lock:
                training_status['is_training'] = False
                training_status['message'] = 'Invalid model type'
            logging.warning("Invalid model type selected.")
            return

        # Process data based on the task
        processed_data = []
        if data['task'] == 'classification':
            template = "Instruction:\nClassify the following text into a category: {text}\n\nResponse:\n{label}"
            for line in uploaded_file:
                try:
                    line = line.strip()
                    line = json.loads(line)
                    text = line["text"]
                    label = line["label"]
                    formatted_entry = template.format(text=text, label=label)
                    processed_data.append(formatted_entry)
                except json.JSONDecodeError as e:
                    logging.error(f"JSONDecodeError: {e}")
                    continue

        elif data['task'] == 'translation':
            template = "Instruction:\nTranslate the following text into English: {text}\n\nResponse:\n{translation}"
            for line in uploaded_file:
                try:
                    line = line.strip()
                    line = json.loads(line)
                    text = line["source_text"]
                    translation = line["target_text"]
                    formatted_entry = template.format(text=text, translation=translation)
                    processed_data.append(formatted_entry)
                except json.JSONDecodeError as e:
                    logging.error(f"JSONDecodeError: {e}")
                    continue

        elif data['task'] == 'extractivequestion_answering':
            template = "Instruction:\nAnswer the following question based on the text: {context}\nQuestion: {question}\n\nResponse:\n{answer}"
            for line in uploaded_file:
                try:
                    line = line.strip()
                    line = json.loads(line)
                    context = line["context"]
                    question = line["question"]
                    answer = line["answer"]
                    formatted_entry = template.format(context=context, question=question, answer=answer)
                    processed_data.append(formatted_entry)
                except json.JSONDecodeError as e:
                    logging.error(f"JSONDecodeError: {e}")
                    continue

        elif data['task'] == 'chatbot':
            template = "Instruction:\nRespond to the following message: {message}\n\nResponse:\n{response}"
            for line in uploaded_file:
                try:
                    line = line.strip()
                    line = json.loads(line)
                    message = line["prompt"]
                    response = line["response"]
                    formatted_entry = template.format(message=message, response=response)
                    processed_data.append(formatted_entry)
                except json.JSONDecodeError as e:
                    logging.error(f"JSONDecodeError: {e}")
                    continue

        else:
            with training_lock:
                training_status['is_training'] = False
                training_status['message'] = 'Invalid task type'
            logging.warning("Invalid task type selected.")
            return

        validation_split = float(data["validation_split"])
        training_data = processed_data[:int(len(processed_data) * (1 - validation_split))]
        validation_data = processed_data[int(len(processed_data) * (1 - validation_split)):]
        training_data = np.array(training_data)
        validation_data = np.array(validation_data)

        # Calculate batches per epoch
        batch_size = int(data['batch_size'])
        batches_per_epoch = len(training_data) // batch_size
        if len(training_data) % batch_size != 0:
            batches_per_epoch += 1
        
        with training_lock:
            training_status['batches_per_epoch'] = batches_per_epoch

        # Define Lora and hyperparameters
        gemma_lm.backbone.enable_lora(rank=1)
        gemma_lm.preprocessor.sequence_length = 256
        optimizer = keras.optimizers.AdamW(
            learning_rate=float(data.get('learning_rate', 1e-4)),
            weight_decay=0.01, )
        optimizer.exclude_from_weight_decay(var_names=["bias", "scale"])

        gemma_lm.compile(
            loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
            optimizer=optimizer,
            weighted_metrics=["accuracy"],
        )

        # Train the model
        history = gemma_lm.fit(training_data, 
                            epochs=int(data['epochs']), 
                            batch_size=batch_size,
                            validation_data=validation_data,
                            callbacks=[keras.callbacks.EarlyStopping(monitor='val_loss',
                                                                   restore_best_weights=data.get('best_model', True),
                                                                   mode='min', 
                                                                   patience=3), 
                                      BatchLossLogger()])

        model_save_path = 'model.keras'
        gemma_lm.save(model_save_path)
        with training_lock:
            training_status['is_training'] = False
            training_status['message'] = 'Model trained successfully'
            training_status['model_url'] = f'http://127.0.0.1:8000/api/download_model?path={model_save_path}'
            training_status['training_loss'] = history.history["loss"]
            training_status['training_accuracy'] = history.history["accuracy"]
        logging.info("Training completed successfully.")

    except Exception as e:
        logging.error(f"Training failed: {str(e)}")
        with training_lock:
            training_status['is_training'] = False
            training_status['message'] = f'Training failed: {str(e)}'


@api_view(['POST'])
def trainModel(request):
    data = request.data
    uploaded_file = request.FILES.get('dataset')

    if not uploaded_file:
        return Response({'message': 'No dataset provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Start training in a separate thread
    thread = threading.Thread(target=train_model_thread, args=(data, uploaded_file.readlines()))
    thread.start()

    return Response({'message': 'Training started in the background'}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def get_training_status(request):
    with training_lock:
        return Response(training_status)


@api_view(['GET'])
def downloadModel(request):
    model_path = request.GET.get('path')
    if os.path.exists(model_path):
        return FileResponse(
            open(model_path, 'rb'),
            as_attachment=True,
            filename="training_model.keras",
            status=status.HTTP_200_OK
        )
    else:
        return Response({'message': 'Model not found'}, status=status.HTTP_404_NOT_FOUND)