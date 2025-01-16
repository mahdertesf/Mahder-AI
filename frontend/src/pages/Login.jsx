import React from "react";
import MahderAI from "../components/MahderAI";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { FaFacebookF } from "react-icons/fa6";

function Login() {
  return (
    <body className="bg-gray-100 w-full">
      <main>
        <MahderAI />

        <section>
          <form className="bg-white w-96 max-sm:mx-4 max-sm:w-auto h-auto mx-auto my-10 p-7 rounded-lg shadow-yellow-500 shadow-lg flex flex-col gap-5 items-center justify-center ">
            <div className="w-full text-center">
              <h1 className="text-blue-500 text-3xl pt-5 font-extrabold ">Welcome Back</h1>
              <h4 className="font-light pt-1">Log in to your account</h4>
            </div>

            <div className="w-full ">
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" id="email" className="border w-full" />
            </div>
            <div className="w-full ">
              <label htmlFor="password">Password</label> <br />
              <input type="password" id="password" className="border w-full" />
            </div>
            <div className=" flex justify-between w-full">
              <div className=" flex gap-1">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="font-thin text-blue-400">
                <a href="#">Forgot password ?</a>
              </div>
            </div>
            <div className="w-full bg-blue-600 text-white rounded-lg p-2 text-center">
              <button type="submit">Log in</button>
            </div>
            <div>
              <p>-------- Or continue with ---------</p>
            </div>
            <div className="flex gap-2 justify-between w-full">
              <div className="border-2 border-blue-400 p-2 px-8 rounded-lg max-sm:px-5">
                <button className="flex gap-1 items-center justify-center">
                  <GoogleIcon /> <span>Google</span>
                </button>
              </div>
              <div className="border-2 border-blue-400 p-2 px-8 max-sm:px-5 rounded-lg">
                <button className="flex gap-1 items-center justify-center">
                <FaFacebookF /> <span>Facebook</span></button>
              </div>
            </div>
            <div>
              <p>
                Don't have an account ? <Link to="/signup" className="text-blue-400">Sign up</Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </body>
  );
}

export default Login;
