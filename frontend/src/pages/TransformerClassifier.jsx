import React from "react";
import MahderAI from "../components/MahderAI";
function TransformerClassifier() {
  return (
    <main className="w-full h-screen bg-gradient-to-t from-yellow-100 to to-blue-100 ">
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="p-8">
          <h1 className="font-extrabold text-9xl max-sm:text-4xl max-md:text-7xl protest-guerrilla-regular  text-center text-blue-500">
            Telegram Hate Content Analyzer
          </h1>
        </div>
        <div className="flex items-center justify-center w-full gap-14  mt-32">
          <div className="w-1/3 h-full rounded-2xl bg-gradient-to-r from-yellow-100 to-red-100 p-16">
            <h2 className="">
              Choose Telegram Channel of Your Choice and See How Much Hateful
              and How Much Hate Free Content It Has
            </h2>
          </div>
          <div className="w-1/3 h-1/2 rounded-2xl bg-gradient-to-r from-yellow-100 to-red-100 p-16">
            <p>Dumy Dumy Dumy Dumy</p>
          </div>
        </div>
        <div className="flex items-center justify-around mt-10 w-full ">
          <div className="flex flex-col items-center bg-blue-300 p-6 rounded-lg">
            <h3>
              Put username of the telegram channel you want to see the level of
              hate
            </h3>
            <input type="text" placeholder="Telegram Channel Username" />
            <button>Analyze</button>
          </div>
          <div className="bg-white">
            <h3>Result</h3>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TransformerClassifier;
