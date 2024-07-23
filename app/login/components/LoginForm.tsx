import { useState } from "react";
import FormInput from "./FormInput";
import checkFormComplete from "@utils/checkFormComplete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleLogin } from "@store/globalSlice";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ inView }: LoginFormProps) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  function handleInputs(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      if (checkFormComplete(inputs, 2)) {
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          inputs
        );
        dispatch(handleLogin(response.data));
        router.push("/account");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        setError(true);
        setErrorMessage("Incorrect username or password");
      } else {
        setError(true);
        setErrorMessage("Connection error, try again!");
      }
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
        loading={loading}
        handleInputs={handleInputs}
      />
      <FormInput
        type="password"
        name="password"
        loading={loading}
        placeholder="Password"
        value={inputs.password}
        handleInputs={handleInputs}
      />

      {error && (
        <div className="w-full relative">
          <div className="absolute w-full h-full bg-red-600 opacity-10 rounded-lg" />
          <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faWarning} /> {errorMessage}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-md bg-site-orange text-white text-sm md:text-base ${
          loading && "opacity-40"
        }`}
      >
        {loading ? "LOADING..." : "SIGN IN"}
      </button>
      <div>
        <button className="text-site-orange">Forgot password</button>
      </div>
    </form>
  );
}

interface LoginFormProps {
  inView: "register" | "login" | "OTP" | "complete";
}

export default LoginForm;
