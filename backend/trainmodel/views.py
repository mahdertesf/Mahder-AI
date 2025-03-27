from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
import keras
import keras_nlp


#load the environment variables for authentication

os.environ["KAGGLE_USERNAME"] = "mahdertesfayeabebe"
os.environ["KAGGLE_KEY"] = "7716050dc2e8cdacfca2f913de1d4508"


os.environ["KERAS_BACKEND"] = "torch" 
os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"]="1.00"

loss=None
accuracy=None
current_batch=None

class BatchLossLogger(keras.callbacks.Callback):
    def __init__(self):
        super().__init__()
        self.batch_losses = []
    
    def on_train_batch_end(self, batch, logs=None):
        self.batch_losses.append(logs['loss'])
        global loss
        loss=logs['loss']
        global accuracy
        accuracy=logs['accuracy']
        global current_batch
        current_batch=batch
        
    
    
        
@api_view(['POST'])
def trainModel(request):
    data=request.data
    if data['model_type']=='gemma2b':
        gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_2b_en")
        
    elif data['model_type']=='gemma9b':
        gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_9b_en")
       
    elif data['model_type']=='gemma27b':
        gemma_lm = keras_nlp.models.GemmaCausalLM.from_preset("gemma2_27b_en")
    else:
        return Response({'message':'Invalid model type'},status=status.HTTP_400_BAD_REQUEST)    
    
    
    #let's process the incoming data depending on the kind of trainng task
    uploaded_file = request.FILES['dataset']
    processed_data = []
    if data['task']=='classification':
        template = "Instruction:\nClassify the following text into a category: {text}\n\nResponse:\n{label}"
        for line in uploaded_file:
            line=line.strip()
            line=json.loads(line)
            text = line["text"]
            label = line["label"]
            formatted_entry = template.format(text=text, label=label)
            processed_data.append(formatted_entry)
    elif data['task']=='translation':
        template = "Instruction:\nTranslate the following text into English: {text}\n\nResponse:\n{translation}"
        for line in uploaded_file:
            line=line.strip()
            line=json.loads(line)
            text = line["source_text"]
            translation = line["target_text"]
            formatted_entry = template.format(text=text, translation=translation)
            processed_data.append(formatted_entry)
    elif data['task']=='extractivequestion_answering':
        template = "Instruction:\nAnswer the following question based on the text: {context}\nQuestion: {question}\n\nResponse:\n{answer}"
        for line in uploaded_file:
            line = line.strip()
            line = json.loads(line)
            context = line["context"]
            question = line["question"]
            answer = line["answer"]
            formatted_entry = template.format(context=context, question=question, answer=answer)
            processed_data.append(formatted_entry)
    elif data['task']=='chatbot':
        template = "Instruction:\nRespond to the following message: {message}\n\nResponse:\n{response}"
        for line in uploaded_file:
            line=line.strip()
            line=json.loads(line)
            message = line["prompt"]
            response = line["response"]
            formatted_entry = template.format(message=message, response=response)
            processed_data.append(formatted_entry)
    else:
        return Response({'message':'Invalid task type'},status=status.HTTP_400_BAD_REQUEST)
    
    validation_split = data["validation_split"]
    validation_split = float(validation_split)
    training_data = processed_data[:int(len(processed_data) * (1 - validation_split))]
    validation_data=processed_data[int(len(processed_data) * (1 - validation_split)):]
    
   
        
    
    
    
    #let's define the lora rank pother hyperparameters  
    gemma_lm.backbone.enable_lora(rank=4)
    gemma_lm.preprocessor.sequence_length = 256
    optimizer = keras.optimizers.AdamW(
    learning_rate=data.get('learning_rate', 1e-4),
    weight_decay=0.01,)
    optimizer.exclude_from_weight_decay(var_names=["bias", "scale"])
    
    gemma_lm.compile(
    loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    optimizer=optimizer,
    weighted_metrics=["accuracy"],
    )
    import json
    training_data = []
    file=request.FILES["dataset"]
    for line in file:
        features = json.loads(line)
        # Filter out examples with context, to keep it simple.
        if features["context"]:
            continue
        # Format the entire example as a single string.
        template = "Instruction:\n{instruction}\n\nResponse:\n{response}"
        training_data.append(template.format(**features))

        # Only use 1000 training examples, to keep it fast.
        training_data= training_data[:1000]
    
    gemma_lm.fit(training_data, epochs=int(data['epochs']), batch_size=int(data['batch_size']),
                 callbacks=[keras.callbacks.EarlyStopping( monitor='val_loss',restore_best_weights=data.get('best_model',True), mode='min', patience=3),BatchLossLogger()])
    gemma_lm.save('model.keras')
    return Response({'message':'Model trained successfully'},status=status.HTTP_200_OK)