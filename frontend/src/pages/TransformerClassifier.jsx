import React from "react";
import MahderAI from "../components/MahderAI";
function TransformerClassifier() {
  return (
    <main className="w-full h-screen bg-gradient-to-t from-yellow-100 to to-blue-100 ">
      <section className="flex flex-col items-center justify-center gap-2 mt-40">
        <div className="p-8">
          <h1 className="font-extrabold text-9xl max-sm:text-4xl max-md:text-7xl protest-guerrilla-regular bg-clip-text text-center text-blue-500">
            Telegram Hate Content Analyzer
          </h1>
        </div>

          <div className="w-full p-16 font-serif bg-transparent text-5xl
           text-center font-extralight bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-600"> 
            <h2 className="leading-tight">
              Choose Telegram Channel of Your Choice and See How Much Hateful
              and How Much Hate Free Content It Has
            </h2>
          </div>
         

        <div className="flex   justify-around mt-10 w-full ">
          <div className="flex w-[40%] flex-col items-center border-t-8 border-red-700 p-6 rounded-lg">
         
            <h3 className="text-2xl font text-center">
              Put username of the telegram channel you want to see the level of
              hate
            </h3>
            <input type="text" placeholder="Telegram Channel Username"  className="w-full text-center rounded-2xl mt-8"/>
            <h2 className="text-blue-400 italic">use @tikvahethiopia like format </h2>
            <button className="bg-yellow-400 w-auto p-2 rounded-3xl mt-3 self-start">Analyze</button>
          </div>
          <div className="flex w-[40%] flex-col items-center border-t-8 border-red-700 p-6 rounded-lg">
            <h3 className="text-2xl">Result</h3>
            
          </div>
        </div>
      </section>
    </main>
  );
}

export default TransformerClassifier;
