import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function SignUpForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password,
          re_password: confirmPassword,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.username) {
          throw new Error(responseData.username.join(" "));
        } else if (responseData.email) {
          throw new Error(responseData.email.join(" "));
        } else if (responseData.password) {
          throw new Error(responseData.password.join(" "));
        } else if (responseData.non_field_errors) {
          throw new Error(responseData.non_field_errors.join(" "));
        } else {
          throw new Error("check");
        }
      }
      try {
        const loginResponse = await fetch(
          "http://127.0.0.1:8000/auth/token/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );
        if (!loginResponse.ok) {
          throw new Error("Login again");
        }
        const loginData = await loginResponse.json();
        localStorage.setItem("token", loginData.auth_token);
        setSuccess(true);

        setTimeout(()=>{
          setSuccess(false)
          navigate("/app/trainmodels"); // this will be changed into dashboard later
          window.location.reload();
        },1000)
  
      } catch (error) {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin=async(response)=>{
    try{
      const res= await fetch("http://localhost:8000/dj-rest-auth/google/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({access_token:response.credential})
      })
      if (!res.ok){
        throw new Error("Login/SignUp failed")
      }

      const data=await res.json()
      console.log("Login/signup success",data)
      localStorage.setItem("authToken",data.key)
    }catch(error){
      console.log("Login/SignUp failed",error)
    }
  }

  return (
    <section className="bg-white w-96 max-sm:mx-4 max-sm:w-auto h-auto mx-auto my-10 p-7 rounded-lg shadow-yellow-500 shadow-lg flex flex-col gap-5 items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-5 items-center justify-center"
      >
        <div className="w-full text-center">
          <h1 className="text-blue-500 text-3xl pt-5 font-extrabold ">
            Sign Up
          </h1>
          <h4 className="font-light pt-1">Create new account</h4>
          {success && <div className="  text-green-500 rounded-full p-4"> Account Created Successfully !</div>}
        </div>
        {error && <div className="text-red-500">{error}</div>}

        <div className="w-full ">
          <label htmlFor="fname">First Name</label>
          <br />
          <input
            type="text"
            id="fname"
            className="border w-full px-2"
            placeholder="Your name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="w-full ">
          <label htmlFor="lname">Last Name</label>
          <br />
          <input
            type="text"
            id="lname"
            className="border w-full px-2"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            className="border w-full px-2"
            placeholder="Create your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="w-full ">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            className="border w-full px-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full ">
          <label htmlFor="confirmpassword">Password</label> <br />
          <input
            type="password"
            id="confirmpassword"
            className="border w-full px-2"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="w-full ">
          <label htmlFor="password">Confirm Password</label> <br />
          <input
            type="password"
            id="password"
            className="border w-full px-2"
            placeholder="Confirm the password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password !== confirmPassword && confirmPassword && (
            <p className="text-red-500">Passwords do not match</p>
          )}
        </div>

        <div className="w-full">
          <button
            className="w-full bg-blue-600 text-white rounded-lg p-2 text-center"
            type="submit"
          >
            Sign Up
          </button>
        </div>
       
        <div>
          <p>
            Have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Log in
            </Link>
          </p>
        </div>
      </form>
      <div>
          <p>-------- Or Sign up with ---------</p>
        </div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
  <GoogleLogin
    onSuccess={handleGoogleLogin}
    onError={() => console.error('Google login failed')}
  />
</GoogleOAuthProvider>
      
    
    </section>
  );
}

export default SignUpForm;
