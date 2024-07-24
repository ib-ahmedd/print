import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import checkFormComplete from "@utils/checkFormComplete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleLogin } from "@store/globalSlice";
import { useRouter } from "next/navigation";
import { Inview } from "../types";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";

function LoginForm({ inView, setInView }: LoginFormProps) {
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
    setError(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setError(false);
    setErrorMessage("");
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
      if (err.response?.status === 401) {
        setError(true);
        setErrorMessage("Incorrect username or password");
      } else {
        setError(true);
        setErrorMessage("Connection error, try again!");
      }
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`login_form w-full shrink-0 transition duration-150 absolute top-0 left-0 flex flex-col gap-4 py-8  ${
        inView === "register" && "translate-x-full opacity-0"
      } ${inView === "login" && "translate-x-0 opacity-100"} ${
        inView !== "register" &&
        inView !== "login" &&
        "-translate-x-full opacity-0"
      }`}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        loading={loading}
        handleInputs={handleInputs}
        loginDetailsError={errorMessage === "Incorrect username or password"}
      />
      <FormInput
        type="password"
        name="password"
        loading={loading}
        placeholder="Password"
        value={inputs.password}
        handleInputs={handleInputs}
        loginDetailsError={errorMessage === "Incorrect username or password"}
      />

      {error && <ErrorDisplay errorMessage={errorMessage} />}

      <SubmitBtn
        title="SIGN IN"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <div>
        <button
          onClick={() => {
            setInView("forgot-email");
          }}
          className="text-site-orange"
        >
          Forgot password
        </button>
      </div>
    </form>
  );
}

interface LoginFormProps {
  inView: Inview;
  setInView: Dispatch<SetStateAction<Inview>>;
}

export default LoginForm;
