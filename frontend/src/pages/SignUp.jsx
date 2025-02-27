import MahderAI from "../components/MahderAI";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <body className="bg-gray-100 w-full">
      <main>
        <MahderAI />

        <section>
          <SignUpForm/>
          
        </section>
      </main>
    </body>
  );
}

export default SignUp