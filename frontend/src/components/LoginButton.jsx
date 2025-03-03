import React from 'react'
import { HiOutlineLogin } from "react-icons/hi";
import { Link } from "react-router-dom";

function LoginButton() {

  return (
    <div>
        <Link to="/login" className="bg-blue-500 text-white p-2 justify-center w-auto rounded-3xl flex items-center gap-1">
          <HiOutlineLogin />
          <span>Login</span>
        </Link>
        
    </div>
  )
}

export default LoginButton