import React from "react";
import MahderAI from "../components/MahderAI";

function TransformerClassifier() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50">
      <section className="flex flex-col items-center justify-center gap-8 py-20 px-4 max-sm:py-12">
        <div className="relative text-center px-4">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg blur opacity-20 animate-pulse"></div>
          <h1 className="relative text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-600 leading-tight max-sm:text-5xl">
            Telegram Hate Content Analyzer
          </h1>
        </div>

        <div className="w-full max-w-4xl px-8">
          <h2 className="text-3xl md:text-4xl font-medium text-center text-gray-800 leading-snug max-sm:text-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 font-semibold">
              Scan any Telegram channel
            </span>{" "}
            and instantly reveal its hate speech statistics
          </h2>
          <p className="mt-6 text-xl text-center text-gray-600 max-sm:text-lg">
            Currently optimized for Amharic content channels
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 w-full max-w-6xl px-4">
          <div className="flex w-full md:w-[45%] flex-col items-center bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-600 transform hover:scale-[1.02] transition-all duration-300">
            <div className="mb-6 p-3 bg-red-100 rounded-full">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Analyze a Telegram Channel
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Enter the channel username to evaluate its content
            </p>
            
            <div className="w-full space-y-4">
              <input 
                type="text" 
                placeholder="@channel_username" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
              />
              <p className="text-sm text-blue-500 italic text-center">
                Format example: @tikvahethiopia
              </p>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Analyze Now
              </button>
            </div>
          </div>

          <div className="flex w-full md:w-[45%] flex-col items-center bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600">
            <div className="mb-6 p-3 bg-blue-100 rounded-full">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Analysis Results
            </h3>
            <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-xl">
              <p className="text-gray-400 text-center p-4">
                Enter a channel username to see hate speech analysis results
              </p>
            </div>
            <div className="mt-6 text-sm text-gray-500 text-center">
              <p>Results will show:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Hate speech percentage</li>
                <li>Content category breakdown</li>
                <li>Comparative analysis</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl px-6 py-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Important Note:</h4>
          <p className="text-yellow-700">
            This analyzer is specifically trained on Amharic language content. 
            Results for channels in other languages may not be accurate.
          </p>
        </div>
      </section>
    </main>
  );
}

export default TransformerClassifier;