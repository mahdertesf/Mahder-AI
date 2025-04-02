# MahderAI: Train, Fine-Tune, and Deploy AI Models

MahderAI is a project dedicated to exploring the end-to-end process of building and deploying Artificial Intelligence models. It serves as a personal workspace for training models from scratch or fine-tuning pre-existing ones (like Google's Gemma), and then making them accessible through user-friendly web interfaces built with React and Django.

The primary goal is to bridge the gap between model development in frameworks like TensorFlow/Keras and practical application via web deployment.

## Overview

This repository contains the codebase for:

1.  **Backend API:** Built with Django and Django REST Framework to serve AI models, handle training requests, and manage data.
2.  **Frontend Interface:** Developed using React to provide an interactive user experience for interacting with the deployed models and initiating fine-tuning tasks.
3.  **AI Models:** Integration of TensorFlow/Keras models, including custom-trained ones and fine-tuned versions of larger models.

Currently, two main applications are showcased within this project.

## Features

*   **Model Training & Fine-Tuning:** Infrastructure and examples for training models or fine-tuning existing ones (e.g., Gemma).
*   **Web Deployment:** Exposes trained models via a Django backend API.
*   **Interactive Frontend:** Interact with models and manage tasks through a React single-page application.
*   **Modular Design:** Separate backend and frontend codebases for clarity and scalability.
*   **Specific Applications:** Includes implementations for:
    *   Telegram Hate Speech Classification (Amharic)
    *   Gemma Model Fine-Tuning UI

## Technology Stack

*   **Backend:** Python, Django
*   **Frontend:** JavaScript, React.js
*   **Machine Learning:** TensorFlow, Keras
*   **Telegram Integration:** Telethon (for the Hate Speech Classifier)

### 1. Telegram Hate Speech Classifier (Amharic)

*   **Functionality:** Analyzes messages fetched from a public Telegram channel (specified by username) to estimate the proportion of hate speech content. It is specifically trained and optimized for **Amharic** language text.
*   **Technology:** Uses a custom Transformer-based binary classification model built with TensorFlow/Keras and a SentencePiece tokenizer trained on Amharic data.
*   **Training Details:** The process, dataset information, and code used to train this specific Transformer classifier model can be found in this separate repository: [mahdertesf/Transformer-Classifier](https://github.com/mahdertesf/Transformer-Classifier)
*   **Frontend Component:** `frontend/src/pages/TransformerClassifier.js`
*   **Backend API:** `backend/telegramhate/views.py` (endpoint: `/api/v1/predictHate`)

### 2. Gemma Model Fine-Tuning Interface

*   **Functionality:** Provides a "No Code" web interface to fine-tune Google's Gemma models (2B, 9B, 27B variants) for various NLP tasks using a user-uploaded dataset (`.jsonl` format).
*   **Supported Tasks (UI Options):** Classification, Extractive Question Answering, Chatbots, Translation.
*   **Features:** Allows configuration of hyperparameters (epochs, batch size, learning rate, validation split), initiates the fine-tuning process on the backend, tracks progress (basic status), and provides a download link for the resulting fine-tuned model checkpoint (`.keras` file).
*   **Frontend Component:** `frontend/src/pages/TrainModels.js`
*   **Backend API:** Likely handled by views within `backend/app2/` (endpoints for `/api/trainmodel`, `/api/get_training_status`, etc.)

## Important Notes

*   **Missing Model Weights:**  
    The pre-trained weights for the **Telegram Hate Speech Classifier** (`backend/telegramhate/model_weight/binary_classifier_weights_v21.h5`) are **NOT included** in this GitHub repository due to file size limitations imposed by GitHub.

*   **Obtaining the Hate Speech Model Weights:**  
    The pre-trained and fine-tuned model weights are available on **Kaggle** at the following location:  
    🔗 [**Transformer Classifier (Pre-trained and Fine-tuned)**](https://www.kaggle.com/models/mahdertesfayeabebe/transformer-classifier-pre-trained-and-finetuned)

    Alternatively, you can train the model yourself using the dataset and instructions provided in the dedicated training repository:  
     [**mahdertesf/Transformer-Classifier**](https://github.com/mahdertesf/Transformer-Classifier)

    Once trained, place the generated `binary_classifier_weights_v21.h5` (or similarly named) file into the `MahderAI/backend/telegramhate/model_weight/` directory.

*   **Dataset for Pre-training and Fine-tuning:**  
    The dataset used for pre-training and fine-tuning the model is available on **Kaggle**:  
    🔗 [**Amharic Transformer Pre-train and Fine-tuning Data**](https://www.kaggle.com/datasets/mahdertesfayeabebe/amharic-transformer-pre-train-and-fine-tuning-data)

*   **Telegram API Usage:**  
    Using the Hate Speech Classifier requires valid **Telegram API credentials**. Ensure you have obtained these from Telegram and configured them correctly in your `.env` file. Use this feature responsibly and be mindful of Telegram's terms of service and rate limits.

## Future Work / Roadmap

*   Implement more robust training status tracking and logging for the fine-tuning UI.
*   Add support for more base models for fine-tuning.
*   Deploy the applications to a cloud platform (e.g., Heroku, AWS, Google Cloud).
*   Improve error handling and user feedback across both applications.
*   Expand language support for the Hate Speech classifier.

## Contributing

Contributions, issues, and feature requests are welcome! 

## Contact

Mahder Tesfaye - [GitHub Profile](https://github.com/mahdertesf).

**Note:** The application is not available for live view as it requires high-end GPUs, which are costly. Instead, you can clone this code and try it yourself or watch the video I made running both applications (link).
