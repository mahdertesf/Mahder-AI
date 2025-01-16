import React from "react";
import MahderAI from "../components/MahderAI";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { FaFacebookF } from "react-icons/fa6";

function SignUp() {
  return (
    <body className="bg-gray-100 w-full">
      <main>
        <MahderAI />

        <section>
          <form className="bg-white w-96 max-sm:mx-4 max-sm:w-auto h-auto mx-auto my-10 p-7 rounded-lg shadow-yellow-500 shadow-lg flex flex-col gap-5 items-center justify-center ">
            
            <div className="w-full text-center">
              <h1 className="text-blue-500 text-3xl pt-5 font-extrabold ">Sign Up</h1>
              <h4 className="font-light pt-1">Create new account</h4>
            </div>

            <div className="w-full ">
              <label htmlFor="fname">First Name</label>
              <br />
              <input type='text' id="fname" className="border w-full" placeholder="Your name" />
            </div>

            <div className="w-full ">
              <label htmlFor="lname">Last Name</label>
              <br />
              <input type='text' id="lname" className="border w-full" placeholder="Your last name" />
            </div>

            <div className="w-full ">
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" id="email" className="border w-full" placeholder="Your Email" />
            </div>
            <div className="w-full ">
              <label htmlFor="confirmpassword">Password</label> <br />
              <input type="password" id="confirmpassword" className="border w-full" placeholder="Create password" />
            </div>

            <div className="w-full ">
              <label htmlFor="password">Confirm Password</label> <br />
              <input type="password" id="password" className="border w-full" placeholder="Confirm the password"/>
            </div>
            
            
            <div className="w-full bg-blue-600 text-white rounded-lg p-2 text-center">
              <button type="submit">Sign Up</button>
            </div>
            <div>
              <p>-------- Or Sign up with ---------</p>
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
                Have an account? <Link to="/login" className="text-blue-400">Log in</Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </body>
  );
}

export default SignUp