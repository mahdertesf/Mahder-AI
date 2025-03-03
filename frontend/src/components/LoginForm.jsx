import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { FaFacebookF } from "react-icons/fa6";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await response.json();
      localStorage.setItem("token", data.auth_token);
      setSuccess(true);

      setTimeout(()=>{
        setSuccess(false)
        navigate("/contact"); // this will be changed into dashboard later
        window.location.reload();
      },1000)


     
      
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <section className="bg-white w-96 max-sm:mx-4 max-sm:w-auto h-auto mx-auto my-10 p-7 rounded-lg shadow-yellow-500 shadow-lg flex flex-col gap-5 items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 items-center justify-center"
      >
        <div className="w-full text-center">
          <h1 className="text-blue-500 text-3xl pt-5 font-extrabold">
            Welcome Back
          </h1>
          <h4 className="font-light pt-1">Log in to your account</h4>
        </div>
        {
        success && <div className="  text-green-500 rounded-full p-4">Login Successful !</div>
      }
        {error && <div className="text-red-500">{error}</div>}

        <div className="w-full">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            className="border w-full px-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            className="border w-full px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="font-thin text-blue-400">
          <button>Forgot password ?</button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg p-2 text-center"
        >
          Log in
        </button>

        <div>
          <p>
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <div>
        <p>-------- Or continue with ---------</p>
      </div>
      <div className="border-2 border-blue-400 p-2 px-8 rounded-lg max-sm:px-5">
        <button className="flex gap-1 items-center justify-center">
          <GoogleIcon /> <span>Google</span>
        </button>
      </div>
      
    </section>
  );
};

export default LoginForm;
