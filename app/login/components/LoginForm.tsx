import { useState } from "react";
import FormInput from "./FormInput";

function LoginForm({ inView }: LoginFormProps) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [sendError, setSendError] = useState(false);
  const [inCorrectDetails, setInCorrectDetails] = useState(false);

  function handleInputs(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    try {
    } catch (err) {
      console.log(err);
      setSendError(true);
    }
  }

  return (
    <form
      className={`login_form w-full shrink-0 transition duration-150 absolute top-0 left-0 flex flex-col gap-4 py-8 ${
        inView === "register" && "translate-x-full opacity-0"
      } ${inView === "login" && "translate-x-0 opacity-100"} ${
        inView === "OTP" && "translate-x-full opacity-0"
      } ${inView === "complete" && "translate-x-full opacity-0"}`}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        handleInputs={handleInputs}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={inputs.password}
        handleInputs={handleInputs}
      />
      <button className="w-full py-3 rounded-md bg-site-orange text-white text-sm md:text-base">
        SIGN IN
      </button>
    </form>
  );
}

interface LoginFormProps {
  inView: "register" | "login" | "OTP" | "complete";
}

export default LoginForm;
