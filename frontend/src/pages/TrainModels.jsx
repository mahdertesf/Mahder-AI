import React, { useState } from 'react'
import Result from '../components/app2/Result'

function TrainModels() {
    const [formData, setFormData] = useState({
        model_type: 'gemma2b',
        task: 'classification',
        epochs: 1,
        batch_size: 1,
        learning_rate: 0.0001,
        validation_split: 0.2,
        early_stopping: true,
        best_model: true
    });
    const [dataset, setDataset] = useState(null);
    const [trainingResults, setTrainingResults] = useState(null);
    const [isTraining, setIsTraining] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setDataset(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsTraining(true);
        setError(null);
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('dataset', dataset);
            
            // Append all form data
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await fetch('http://127.0.0.1:8000/api/trainmodel', {
                method: 'POST',
                body: formDataToSend,
            
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Training failed');
            }

            const result = await response.json();
            setTrainingResults(result);
            console.log("Training done")
            console.log(result);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsTraining(false);
        }
    };

    const handleDownload = async () => {
        if (!trainingResults?.model_url) return;
        
        try {
            const response = await fetch(trainingResults.model_url);
            if (!response.ok) {
                throw new Error('Failed to download model');
            }
            
            // Create a blob from the response and trigger download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'training_model.keras';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className='w-full min-h-screen bg-gradient-to-t from-yellow-100 to to-blue-100'>
            <div className='shadow-2xl shadow-white h-min-full capitalize bg-yellow-50 font-extrabold text-9xl max-sm:text-5xl max-lg:text-6xl p-8 text-center text-blue-400 items-center justify-center hover:border-blue-300'>
                <h1 className='leading-[1.3]'>Fine tune Gemma2 models without any code and download your checkpoints</h1>
            </div>
            <div className='flex justify-between gap-2 p-8 text-xl w-full max-lg:flex-col'>
                <form onSubmit={handleSubmit} className='border-8 flex flex-col gap-8 p-8 w-1/2 max-lg:w-full'>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Choose Model</label>
                        <select 
                            name="model_type" 
                            className='w-1/2 p-2'
                            value={formData.model_type}
                            onChange={handleInputChange}
                        >
                            <option value="gemma2b">Gemma2B</option>
                            <option value="gemma9b">Gemma9B</option>
                            <option value="gemma27b">Gemma27B</option>
                        </select>
                    </div>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Choose Task</label>
                        <select 
                            name="task" 
                            className='w-1/2 p-2'
                            value={formData.task}
                            onChange={handleInputChange}
                        >
                            <option value="classification">Classification</option>
                            <option value="extractivequestion_answering">Extractive Question Answering</option>
                            <option value="chatbot">Chatbots</option>
                            <option value="translation">Translation</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 items-center'>
                        <div className='flex gap-4 justify-center'>
                            <label>Upload Dataset</label>
                            <input 
                                type='file' 
                                className='w-1/2' 
                                onChange={handleFileChange}
                                accept=".jsonl"
                                required
                            />
                        </div>
                        <h3 className='font-light text-neutral-600 hover:text-black'>
                            The file format should be in .json. 
                            <a className='text-red-700' href="https://github.com/mahdertesf/LLM-Fine-tunning-Data-Format">see this file for more detail</a>
                        </h3>
                    </div>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Number of Epochs</label>
                        <input 
                            type='number' 
                            name="epochs"
                            className='w-1/2 p-2' 
                            value={formData.epochs}
                            onChange={handleInputChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Batch Size</label>
                        <input 
                            type='number' 
                            name="batch_size"
                            min={1} 
                            max={16} 
                            className='w-1/2 p-2' 
                            value={formData.batch_size}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Learning Rate</label>
                        <input 
                            type='number' 
                            name="learning_rate"
                            step="0.0001"
                            className='w-1/2 p-2' 
                            value={formData.learning_rate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                        <label>Validation Split Size</label>
                        <input 
                            type='number' 
                            name="validation_split"
                            className='w-1/2 p-2' 
                            min={0} 
                            max={1} 
                            step="0.1"
                            value={formData.validation_split}
                            onChange={handleInputChange}
                            placeholder='use value between 0 and 1'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 items-center'>
                        <div className='flex gap-4'>
                            <label>Early Stopping</label>
                            <input 
                                type="checkbox" 
                                name="early_stopping"
                                checked={formData.early_stopping}
                                onChange={handleInputChange}
                            />
                        </div>
                        <h3 className='font-light text-neutral-600 hover:text-black'>recommended to be checked</h3>
                    </div>
                    <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-around items-center'>
                        <div className='flex gap-4'>
                            <label>Save Best Model</label>
                            <input 
                                type="checkbox" 
                                name="best_model"
                                checked={formData.best_model}
                                onChange={handleInputChange}
                            />
                        </div>
                        <h3 className='font-light text-neutral-600 hover:text-black'>recommended to be checked</h3>
                    </div>
                    <div className='bg-yellow-400 p-2 rounded-3xl mt-3 text-center w-full'>
                        <button type="submit" disabled={isTraining}>
                            {isTraining ? 'Training...' : 'Train'}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-600 p-4 bg-red-100 rounded-lg">
                            Error: {error}
                        </div>
                    )}
                </form>
                <div className='border-8 self-start p-8 w-1/2 max-lg:w-full'>
                    <h1 className='text-center'>Result</h1>
                    <Result 
                        results={trainingResults} 
                        onDownload={handleDownload}
                        isTraining={isTraining}
                    />
                </div>
            </div>
        </main>
    )
}

export default TrainModels