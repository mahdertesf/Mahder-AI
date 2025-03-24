from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
import keras
import keras_nlp


#load the environment variables for authentication
load_dotenv()
os.environ["KAGGLE_USERNAME"] = os.getenv("KAGGLE_USERNAME")
os.environ["KAGGLE_KEY"] = os.getenv("KAGGLE_KEY")


os.environ["KERAS_BACKEND"] = "torch" 
os.environ["XLA_PYTHON_CLIENT_MEM_FRACTION"]="1.00"

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
    gemma_lm.fit(data['file'], epochs=data['epochs'], batch_size=data['batch_size'])
    gemma_lm.save('model.keras')
