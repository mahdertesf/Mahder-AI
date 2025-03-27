import React from 'react';

function Result({ results, onDownload, isTraining }) {
    return (
        <div className="mt-4">
            {isTraining ? (
                <div className="text-center p-4">
                    <p>Training in progress...</p>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
                </div>
            ) : results ? (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Training Results</h2>
                    <p className="text-green-600">Model trained successfully!</p>
                    
                    <div>
                        <h3 className="font-semibold">Training Loss:</h3>
                        <ul className="list-disc pl-5">
                            {results.training_loss.map((loss, idx) => (
                                <li key={idx}>Epoch {idx + 1}: {loss.toFixed(4)}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold">Training Accuracy:</h3>
                        <ul className="list-disc pl-5">
                            {results.training_accuracy.map((acc, idx) => (
                                <li key={idx}>Epoch {idx + 1}: {(acc * 100).toFixed(2)}%</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold">Validation Accuracy:</h3>
                        <ul className="list-disc pl-5">
                            {results.val_accuracy.map((acc, idx) => (
                                <li key={idx}>Epoch {idx + 1}: {(acc * 100).toFixed(2)}%</li>
                            ))}
                        </ul>
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