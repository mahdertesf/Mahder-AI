import React from "react";
import MahderAI from "../components/MahderAI";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <body className="bg-gray-100 w-full">
      <main>
        <MahderAI />
        <section>
          <LoginForm />
        </section>
      </main>
    </body>
  );
}

export default Login;