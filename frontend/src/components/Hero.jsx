import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-5 bg-gradient-to-t from-yellow-100 to to-blue-100  ">
      <div className="font-extrabold text-9xl max-sm:text-4xl max-md:text-7xl protest-guerrilla-regular  text-center">Welcome to <span className="protest-guerrilla-regular text-blue-500">Mahder AI</span></div>
      <div className="text-5xl max-sm:text-2xl max-md:text-4xl text-center"> Your Hub for AI-Powered Innovations and Solutions</div>
      <div className="text-3xl max-sm:text-sm  max-md:text-xl text-center italic font-thin" >
        Discover my cutting-edge AI apps crafted with passion and precision
      </div>
      <div className="mt-5">
        <Link to="/apps" className=" bg-yellow-500 text-white p-3 text-xl rounded-md  hover:bg-yellow-600 ">
          Explore AI Apps
        </Link>
      </div>
    </section>
  );
}

export default Hero;
