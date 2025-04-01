from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dotenv import load_dotenv
import os
from telethon import TelegramClient
import pandas as pd
import json
from pathlib import Path
import json
import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import pandas as pd
import json
import re
import random
import emoji
import sentencepiece as spm
import string
from collections import Counter
import time
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras.metrics import Mean, SparseCategoricalAccuracy
from .helpers import *
import asyncio 

load_dotenv() 
api_id= os.getenv("TELEGRAM_API_ID")
api_hash = os.getenv("TELEGRAM_API_HASH")
PHONE_NUM = os.getenv("PHONE_NUM")


@api_view(["POST"])
def predictHate(request):
    username = request.data.get("username")
    if not username.startswith("@"):
        return Response({"error": "Use correct Username "}, status=400)
    
    session_name = "hello_telegram"
    
    async def main(chat_name, limit):
        async with TelegramClient(session_name, api_id, api_hash) as client:
            try:
                chat_info = await client.get_entity(chat_name)
                messages = await client.get_messages(entity=chat_info, limit=None)
                return ({"messages": messages, "channel": chat_info})
            except Exception as e:
                return {"error": f"Could not access channel: {e}"}  # Return a dictionary for consistent error handling
        
    results = asyncio.run(main(chat_name = username, limit=None))

    # Handle potential errors from main function
    if isinstance(results, dict) and "error" in results:
        return Response({"error": results["error"]}, status=400)

    msg_dict_list = [msg.to_dict() for msg in (results["messages"])]
    messages_list= []
    
    for messag in msg_dict_list:
        if "message" in messag:
            msg = messag["message"].replace("\n", "").strip()
            msg=msg.replace("\xa0","")
            messages_list.append(msg)
            
    def clean_text(text):
        text = re.sub(r'https?://[^\s\n\r]+', '', text)
        text = re.sub(r'#\S+', '', text)
        text=re.sub(r'@\S+', '', text)
        text=emoji.replace_emoji(text," ")
        english_pattern = re.compile(r'\b[A-Za-z]+\b')
        cleaned_text = re.sub(english_pattern, '', text)
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()

        return cleaned_text
    cleaned_data=[clean_text(content) for content in messages_list]
    tokenizer=spm.SentencePieceProcessor(model_file="/Users/mahder/Real Projects/Mahder AI/backend/telegramhate/sentencepiece_model/amharic_sp_model.model")
    
    max_size=50
    def reduce_size(data, max_size):
        for element in data: 
            sub_array = element.split()
            for i in range(0, len(sub_array), max_size): 
                yield  ' '.join(sub_array[i:i + max_size])
                
    cleaned_data_reduced=list(reduce_size(cleaned_data,max_size))
    tokenized_hate_speech_data=[tokenizer.encode_as_ids(post) for post in cleaned_data_reduced]
    tokenized_hate_speech_data_padded=tf.keras.utils.pad_sequences(
        tokenized_hate_speech_data,
        maxlen=None,
        dtype='int32',
        padding='post',
        truncating='post',)
    POSITIONAL_ENCODING_INPUT_LENGTH_HATE =tokenized_hate_speech_data_padded.shape[1]
    POSITIONAL_ENCODING_TARGET_LENGTH_HATE =1
    
    # Define the model parameters
    NUM_LAYERS = 6
    EMBEDDING_DIM = 512
    FULLY_CONNECTED_DIM = 2048
    NUM_HEADS= 8
    vocab_size = tokenizer.vocab_size()


    # Initialize the model
    transformer_pretrained = Transformer(
        NUM_LAYERS,
        EMBEDDING_DIM,
        NUM_HEADS,
        FULLY_CONNECTED_DIM,
        vocab_size,
        vocab_size,
        POSITIONAL_ENCODING_INPUT_LENGTH_HATE,
        POSITIONAL_ENCODING_TARGET_LENGTH_HATE,)
    
    #build the model for the hate speech classification
    sentence_a = np.array([[2, 3, 1, 3, 0, 0, 0]])
    sentence_b = np.array([[1, 3, 4, 0, 0, 0, 0]])

    enc_padding_mask = create_padding_mask(sentence_a)
    dec_padding_mask = create_padding_mask(sentence_a)
    look_ahead_mask = create_look_ahead_mask(sentence_a.shape[1])

    test_summary, att_weights = transformer_pretrained(
        tf.Variable(sentence_a),
        tf.Variable(sentence_b),
        enc_padding_mask =enc_padding_mask,
        look_ahead_mask=look_ahead_mask,
        dec_padding_mask=dec_padding_mask,
        training=False # Add training=False here
    )

    print(transformer_pretrained.summary())
    
    binary_classifier = TransformerForBinaryClassification(transformer_pretrained)
    # Create a dummy input to build the model
    dummy_input = tf.ones((1, POSITIONAL_ENCODING_INPUT_LENGTH_HATE), dtype=tf.int32)

    # Call the model with the dummy input to create the variables
    _ = binary_classifier(input_sentence=dummy_input, training=False)
    print(binary_classifier.summary())
    
    binary_classifier.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=5e-7),
        loss=tf.keras.losses.BinaryCrossentropy(),
        metrics=['accuracy']
        )
    try:
        binary_classifier.load_weights("/Users/mahder/Real Projects/Mahder AI/backend/telegramhate/model_weight/binary_classifier_weights_v21.h5")
    except Exception as e:
        return Response({"error": f"Failed to load model weights:{e}"}, status=500)
    
    try:
        prediction=binary_classifier.predict(
            tokenized_hate_speech_data_padded,
            batch_size=64,
            verbose=1
        )
    except Exception as e:
        return Response({"error": f"Prediction failed: {e}"}, status=500)
    
    final_prediciton=prediction.mean()
    
    if final_prediciton>0.5:
        result = "Hate Speech"
    else:
        result="Not Hate"
        
    return Response({"result": result, "prediction": str(final_prediciton)}, status=200)