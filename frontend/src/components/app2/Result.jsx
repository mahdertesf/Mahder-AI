import React from "react";

function Result({ trainingStatus, onDownload }) {
    const isTrainingComplete =
        !trainingStatus.is_training && trainingStatus.model_url;
    const trainingFailed =
        !trainingStatus.is_training &&
        trainingStatus.message &&
        !trainingStatus.model_url;

    // Helper function to safely display values
    const displayValue = (value) => {
        if (value === undefined || value === null || Number.isNaN(value)) {
            return "waiting...";
        }
        if (typeof value === "number") {
            if (!Number.isFinite(value)) {
                return "calculating...";
            }
            return value.toFixed(4);
        }
        return Number(value).toFixed(4);
    };

    // Calculate progress percentages
    const epochProgress = trainingStatus.current_epoch !== undefined && trainingStatus.epochs !== undefined 
        ? ((trainingStatus.current_epoch + 1) / trainingStatus.epochs) * 100 
        : 0;

    const batchProgress = trainingStatus.current_batch !== undefined && trainingStatus.batches_per_epoch !== undefined 
        ? ((trainingStatus.current_batch + 1) / trainingStatus.batches_per_epoch) * 100 
        : 0;

    return (
        <div className="mt-4">
            {trainingStatus.is_training ? (
                <div className="text-center p-4 flex flex-col justify-center items-center gap-4">
                    <p className="text-3xl animate-pulse text-indigo-600">
                        Training in progress...
                    </p>

                    {/* Epoch Progress */}
                    <div className="w-full">
                        <div className="flex justify-between mb-1">
                            <span className="text-lg font-medium">Epoch Progress</span>
                            <span className="text-lg font-medium">
                                {trainingStatus.current_epoch !== undefined ? trainingStatus.current_epoch + 1 : "0"} / {trainingStatus.epochs || "?"}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-blue-600 h-4 rounded-full" 
                                style={{ width: `${epochProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Batch Progress */}
                    <div className="w-full">
                        <div className="flex justify-between mb-1">
                            <span className="text-lg font-medium">Batch Progress</span>
                            <span className="text-lg font-medium">
                                {trainingStatus.current_batch !== undefined ? trainingStatus.current_batch + 1 : "0"} / {trainingStatus.batches_per_epoch || "?"}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-green-600 h-4 rounded-full" 
                                style={{ width: `${batchProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col w-full justify-between items-start gap-4 mt-14">
                            <div className="flex w-full gap-40 border-b-4 border-white justify-between items-center">
                                <h3>Current Epoch</h3>
                                <span className="text-blue-800 p-5">
                                    {trainingStatus.current_epoch !== undefined ? trainingStatus.current_epoch + 1 : "..."}
                                </span>
                            </div>
                            <div className="flex w-full gap-40 border-b-4 border-white justify-between items-center">
                                <h3>Current Batch</h3>
                                <span className="text-blue-800 p-5">
                                    {displayValue(trainingStatus.current_batch !== undefined ? trainingStatus.current_batch + 1 : null)}
                                </span>
                            </div>
                            <div className="flex w-full gap-40 border-b-4 border-white justify-between items-center">
                                <div className="flex flex-col justify-start items-start text-start">
                                    <h3 >Training Accuracy</h3>
                                    <p className="text-neutral-500 text-sm border-2 text-start">
                                        at epoch {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : 1} and
                                        batch {typeof trainingStatus.current_batch === "number" ? trainingStatus.current_batch + 1 : 1}
                                    </p>
                                </div>
                                <span className="text-blue-800 p-5">
                                    {displayValue(trainingStatus.accuracy)}
                                </span>
                            </div>
                            <div className="flex w-full gap-40 border-b-4 border-white justify-between items-center">
                                <div className="flex flex-col justify-center items-start">
                                    <h3 className="text-start">Training Loss</h3>
                                    <p className="text-neutral-500 text-sm text-start">
                                        at epoch {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : 1} and
                                        batch {typeof trainingStatus.current_batch === "number" ? trainingStatus.current_batch + 1 : 1}
                                    </p>
                                </div>
                                <span className="text-blue-800 p-5">
                                    {displayValue(trainingStatus.loss)}
                                </span>
                            </div>
                            <div className="flex flex-col w-full bg-yellow-50 rounded-xl p-6">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex max-sm:flex-col gap-2 justify-between items-center w-full">
                                        <div className="flex flex-col w-full border-b-4 border-neutral-400 justify-between items-center">
                                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                                <h3>Training Loss</h3>
                                                <p className="text-neutral-500 text-sm ">
                                                    at epoch{" "}
                                                    {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : "..."}
                                                </p>
                                            </div>
                                            <span className="text-blue-800 p-5">
                                                {displayValue(trainingStatus.Training_loss_at_epoch)}
                                            </span>
                                        </div>
                                        <div className="flex w-full flex-col border-b-4 border-neutral-400 my-4 justify-between items-center">
                                            <div className="flex flex-col justify-center items-start items-start max-sm:items-center">
                                                <h3>Training Accuracy</h3>
                                                <p className="text-neutral-500 text-sm">
                                                    at epoch{" "}
                                                    {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : "..."}
                                                </p>
                                            </div>
                                            <span className="text-blue-800 p-5">
                                                {displayValue(trainingStatus.Training_accuracy_at_epoch)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex max-sm:flex-col justify-between items-center w-full">
                                    <div className="flex flex-col w-full border-b-4 border-white justify-between items-center">
                                        <div className="flex flex-col justify-center items-start items-start max-sm:items-center">
                                            <h3>Validation Loss</h3>
                                            <p className="text-neutral-500 text-sm">
                                                at epoch{" "}
                                                {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : "..."}
                                            </p>
                                        </div>
                                        <span className="text-blue-800 p-5">
                                            {displayValue(trainingStatus.val_loss)}
                                        </span>
                                    </div>
                                    <div className="flex w-full flex-col border-b-4 border-white justify-between items-center">
                                        <div className="flex flex-col justify-center items-start items-start max-sm:items-center">
                                            <h3>Validation Accuracy</h3>
                                            <p className="text-neutral-500 text-sm">
                                                at epoch{" "}
                                                {typeof trainingStatus.current_epoch === "number" ? trainingStatus.current_epoch + 1 : "..."}
                                            </p>
                                        </div>
                                        <span className="text-blue-800 p-5">
                                            {displayValue(trainingStatus.val_accuracy)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
                </div>
            ) : isTrainingComplete ? (
                <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Training Results</h2>
  
  {trainingStatus.message && (
    <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-center">
      {trainingStatus.message}
    </div>
  )}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Training Metrics */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Training Metrics</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Loss:</span>
          <span className="font-mono text-gray-800">
            {displayValue(trainingStatus.training_loss)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Accuracy:</span>
          <span className="font-mono text-gray-800">
            {displayValue(trainingStatus.training_accuracy)}
          </span>
        </div>
      </div>
    </div>

    {/* Validation Metrics */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Validation Metrics</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Loss:</span>
          <span className="font-mono text-gray-800">
            {displayValue(trainingStatus.val_loss)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Accuracy:</span>
          <span className="font-mono text-gray-800">
            {displayValue(trainingStatus.val_accuracy)}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div className="flex justify-center pt-4">
    <button
      onClick={onDownload}
      className={`px-6 py-2 rounded-full font-medium transition-all ${
        trainingStatus.model_url
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!trainingStatus.model_url}
    >
      {trainingStatus.model_url ? (
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Model
        </span>
      ) : (
        "Model Not Ready"
      )}
    </button>
  </div>
</div>
            ) : trainingFailed ? (
                <div className="text-center p-4">
                    <h2 className="text-xl font-bold">Training Failed</h2>
                    {trainingStatus.message && (
                        <p className="text-red-500">{trainingStatus.message}</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-500 text-center">
                    No training results yet. Submit a training job to see results.
                </p>
            )}
        </div>
    );
}

export default Result;