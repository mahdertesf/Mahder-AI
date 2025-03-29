import React, { useState, useEffect } from "react";
import Result from "../components/app2/Result";

function TrainModels() {
  const [formData, setFormData] = useState({
    model_type: "gemma2b",
    task: "classification",
    epochs: 1,
    batch_size: 1,
    learning_rate: 0.0001,
    validation_split: 0.2,
  });
  const [dataset, setDataset] = useState(null);
  const [trainingStatus, setTrainingStatus] = useState({ is_training: false });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setDataset(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setTrainingStatus({ is_training: true });

    const formDataToSend = new FormData();
    formDataToSend.append("dataset", dataset);
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/trainmodel", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Training failed");
      }
    } catch (err) {
      setError("Training Failed. Please try again.");
      setTrainingStatus({ is_training: false });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let intervalId;

    const fetchTrainingStatus = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/get_training_status"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch training status");
        }
        const data = await response.json();
        setTrainingStatus(data);
        setError(null);

        if (!data.is_training) {
          clearInterval(intervalId);
        }
      } catch (err) {
        setError(err.message || "Error fetching training status");
        clearInterval(intervalId);
        setTrainingStatus((prev) => ({
          ...prev,
          is_training: false,
          message: "Error fetching training status",
        }));
      }
    };

    if (trainingStatus.is_training) {
      fetchTrainingStatus();
      intervalId = setInterval(fetchTrainingStatus, 2000);
    }

    return () => clearInterval(intervalId);
  }, [trainingStatus.is_training]);

  const handleDownload = async () => {
    if (!trainingStatus.model_url) {
      setError("Model URL not available");
      return;
    }

    try {
      const response = await fetch(trainingStatus.model_url);
      if (!response.ok) {
        throw new Error("Failed to download model");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "training_model.keras";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-t from-yellow-100 to to-blue-100">
      <div className="relative h-min-full p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl opacity-20 blur-xl"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-600 leading-tight mb-4">
            Fine-Tune Gemma2 Models
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">
            No Code Required • Download Checkpoints • Enterprise Ready
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="inline-block px-4 py-2 text-blue-900 font-bold rounded-full text-lg animate-pulse">
              One-Click Training
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 p-8 text-xl w-full max-lg:flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 p-8 w-1/2 max-lg:w-full"
        >
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Choose Model</label>
            <select
              name="model_type"
              className="w-1/2 p-2"
              value={formData.model_type}
              onChange={handleInputChange}
            >
              <option value="gemma2b">Gemma2B</option>
              <option value="gemma9b">Gemma9B</option>
              <option value="gemma27b">Gemma27B</option>
            </select>
          </div>
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Choose Task</label>
            <select
              name="task"
              className="w-1/2 p-2"
              value={formData.task}
              onChange={handleInputChange}
            >
              <option value="classification">Classification</option>
              <option value="extractivequestion_answering">
                Extractive Question Answering
              </option>
              <option value="chatbot">Chatbots</option>
              <option value="translation">Translation</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 items-center">
            <div className="flex gap-4 justify-center">
              <label>Upload Dataset</label>
              <input
                type="file"
                className="w-1/2"
                onChange={handleFileChange}
                accept=".jsonl"
                required
              />
            </div>
            <h3 className="font-light text-neutral-600 hover:text-black">
              The file format should be in .json.
              <a
                className="text-red-700"
                href="https://github.com/mahdertesf/LLM-Fine-tunning-Data-Format"
              >
                see this file for more detail
              </a>
            </h3>
          </div>
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Number of Epochs</label>
            <input
              type="number"
              name="epochs"
              className="w-1/2 p-2"
              value={formData.epochs}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Batch Size</label>
            <input
              type="number"
              name="batch_size"
              min={1}
              max={16}
              className="w-1/2 p-2"
              value={formData.batch_size}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Learning Rate</label>
            <input
              type="number"
              name="learning_rate"
              step="0.0001"
              className="w-1/2 p-2"
              value={formData.learning_rate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between">
            <label>Validation Split Size</label>
            <input
              type="number"
              name="validation_split"
              className="w-1/2 p-2"
              min={0}
              max={1}
              step="0.1"
              value={formData.validation_split}
              onChange={handleInputChange}
              placeholder="use value between 0 and 1"
              required
            />
          </div>

          <div className="bg-yellow-400 p-2 rounded-3xl mt-3 text-center w-full">
            <button
              type="submit"
              disabled={trainingStatus.is_training || isLoading}
            >
              {isLoading
                ? "Submitting..."
                : trainingStatus.is_training
                ? "Training..."
                : "Train"}
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
        </form> 
        <div className="rounded-xl self-start p-8 w-1/2 max-lg:w-full bg-blue-100">
          <h1 className="text-center text-4xl max-sm:text-2xl">Result</h1>
        
          <Result
            trainingStatus={{ ...trainingStatus, epochs: formData.epochs }}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </main>
  );
}

export default TrainModels;
