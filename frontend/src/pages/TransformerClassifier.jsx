import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function TransformerClassifier() {
  const [channelName, setChannelName] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setAnalysisResults(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/predictHate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: channelName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.error || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      setAnalysisResults(data);
    } catch (error) {
      console.error("Error during analysis:", error);
      setErrorMessage(
       "Use correct username and try again "
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setAnalysisResults(null);
    };
  }, []);

  const getHateSpeechPercentage = () => {
    if (analysisResults && analysisResults.prediction) {
      const predictionValue = parseFloat(analysisResults.prediction);
      return Math.round(predictionValue * 100);
    }
    return 0;
  };

  const hateSpeechPercentage = getHateSpeechPercentage();

  const getHateSpeechLabel = () => {
    if (analysisResults && analysisResults.result) {
      return analysisResults.result;
    }
    return "No analysis yet";
  };

  const hateSpeechLabel = getHateSpeechLabel();

  const getColor = (percentage) => {
    if (percentage <= 25) {
      return "#28a745";
    } else if (percentage <= 50) {
      return "#ffc107";
    } else if (percentage <= 75) {
      return "#fd7e14";
    } else {
      return "#dc3545";
    }
  };

  const color = getColor(hateSpeechPercentage);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <section className="flex flex-col items-center justify-center gap-8 py-20 px-4 max-sm:py-12">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight max-sm:text-4xl">
            Telegram Hate Content Analyzer
          </h1>
        </div>

        <div className="w-full max-w-4xl px-8">
          <h2 className="text-3xl md:text-4xl font-medium text-center text-gray-800 leading-snug max-sm:text-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold">
              Scan any Telegram channel<br />
            </span>
            and instantly reveal its hate speech statistics
          </h2>
          <p className="mt-6 text-xl text-center text-gray-600 max-sm:text-lg">
            Currently optimized for Amharic content channels
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 w-full max-w-6xl px-4">
          <div className="flex w-full md:w-[45%] flex-col items-center bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600 hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-6 p-3 bg-blue-100 rounded-full">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Analyze a Telegram Channel
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Enter the channel username to evaluate its content.
            </p>

            <div className="w-full space-y-4">
              <input
                type="text"
                placeholder="@channel_username"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              <p className="text-sm text-blue-500 italic text-center">
                Format example: @tikvahethiopia
              </p>
              <button
                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                onClick={handleAnalyzeClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Analyze Now
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="flex w-full md:w-[45%] flex-col items-center bg-white p-8 rounded-2xl shadow-xl border-t-4 border-indigo-600 hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-6 p-3 bg-indigo-100 rounded-full">
              <svg
                className="w-10 h-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Analysis Results
            </h3>
            <div className="w-full min-h-[16rem] flex items-center justify-center flex-col rounded-xl overflow-hidden">
              {errorMessage && (
                <p className="text-red-500 text-center p-4">{errorMessage}</p>
              )}
              {isLoading ? (
                <svg
                  className="animate-spin h-10 w-10 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : analysisResults ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48">
                    <CircularProgressbar
                      value={hateSpeechPercentage}
                      text={`${hateSpeechPercentage}%`}
                      styles={buildStyles({
                        textColor: color,
                        pathColor: color,
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                  <p className="mt-4 text-gray-700 text-center">
                    This channel is classified as:{" "}
                    <span className="font-bold">{hateSpeechLabel}</span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-center p-4">
                  Enter a channel username to see hate speech analysis results.
                </p>
              )}
            </div>
            <div className="mt-6 text-sm text-gray-500 text-center">
              <p>Results will show:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Hate speech percentage</li>
                <li>Content category breakdown</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl px-6 py-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg shadow-md">
          <h4 className="font-medium text-blue-800 mb-2">Important Note:</h4>
          <p className="text-blue-700">
            This analyzer is specifically trained on Amharic language content.
            Results for channels in other languages may not be accurate.
          </p>
        </div>
      </section>
    </main>
  );
}

export default TransformerClassifier;