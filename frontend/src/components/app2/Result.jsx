import React from 'react';

function Result({ results, onDownload, isTraining }) {
    return (
        <div className="mt-4">
            {isTraining ? (
                <div className="text-center p-4">
      
                    <p>Training in progress...</p>
                    
                    <div>
                        <div>
                            <h3>Epoch</h3>
                            <h4>4</h4>
                        </div>
                        <div>
                        <h3>Epoch</h3>
                        <h4>4</h4>
                        </div>
                        <div>
                        <h3>Epoch</h3>
                        <h4>4</h4>
                        </div>
                        <div>
                        <h3>Epoch</h3>
                        <h4>4</h4>
                        </div>
                    </div>
                    <div></div>
                   
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
                </div>
            ) : True? (             
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Training Results</h2>
                    {console.log(results.training_accuracy)}
                    <p className="text-green-600">Model trained successfully!</p>
                    
                    <div>
                        <h3 className="font-semibold">Training Loss:</h3>
                       <h5>{(results.training_loss)[results.training_loss.length -1]}</h5>
                    </div>
                    <div>
                        <h3 className="font-semibold">Validation Loss:</h3>
                        <h5>{(results.validation_loss)[results.validation_loss.length-1]}</h5>
                    </div>    
                    
                    <div>
                        <h3 className="font-semibold">Training Accuracy:</h3>
                        <h4>{(results.training_accuracy)[results.training_accuracy.length -1]}</h4>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold">Validation Accuracy:</h3>
                        <h4>{(results.validation_accuracy)[results.validation_accuracy.length-1]}</h4>
                    </div>
                    
                    <button 
                        onClick={onDownload}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Model
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">No training results yet. Submit a training job to see results.</p>
            )}
        </div>
    );
}

export default Result;