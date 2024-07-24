import checkFormComplete from "@utils/checkFormComplete";
import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { Inview } from "../types";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";

function SignUpForm({ inView, setPendingUser, setInview }: SignUpFormProps) {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    conf_password: "",
  });

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [error, setError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputs(e: any) {
    setFormIncomplete(false), setPasswordsMatch(true), setErrorMessage("");
    setError(false);
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError(false);
    setFormIncomplete(false);
    if (checkFormComplete(inputs, 5)) {
      if (inputs.password === inputs.conf_password) {
        if (inputs.password.length > 5) {
          try {
            const response = await axios.post(
              "http://localhost:4000/api/auth/request-otp",
              {
                email: inputs.email,
                method: "register",
              }
            );
            setPendingUser(inputs);
            setInview("OTP");
          } catch (err: any) {
            console.log(err);
            if (err.response.status === 402) {
              setError(true);
              setErrorMessage("Email is already registered!");
            } else {
              setError(true);
              setErrorMessage("Error connecting to server, try again!");
            }
          }
        } else {
          setError(true);
          setErrorMessage("Password should contain 6 or more characters!");
          setPasswordsMatch(false);
        }
      } else {
        setError(true);
        setPasswordsMatch(false);
        setErrorMessage("Passwords do not match!");
      }
    } else {
      setError(true);
      setFormIncomplete(true);
      setErrorMessage("Fill all input fields!");
    }
    setLoading(false);
  }
  return (
    <form
      className={`login_form w-full shrink-0 transition duration-150 absolute top-0 left-0 flex flex-col gap-4 py-8 ${
        inView === "register" && "translate-x-0 opacity-100"
      } ${inView === "OTP" && "translate-x-full opacity-0"} ${
        inView !== "register" &&
        inView !== "OTP" &&
        "-translate-x-full opacity-0"
      } `}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormInput
        type="text"
        name="fname"
        placeholder="Firstname"
        value={inputs.fname}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        loading={loading}
      />
      <FormInput
        type="text"
        name="lname"
        placeholder="Lastname"
        value={inputs.lname}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        loading={loading}
      />
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        loading={loading}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={inputs.password}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        passwordsMatch={passwordsMatch}
        loading={loading}
      />
      <FormInput
        type="password"
        name="conf_password"
        placeholder="Confirm Password"
        value={inputs.conf_password}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        passwordsMatch={passwordsMatch}
        loading={loading}
      />
      {error && <ErrorDisplay errorMessage={errorMessage} />}
      <SubmitBtn
        title="REGISTER"
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </form>
  );
}

interface SignUpFormProps {
  inView: Inview;
  setPendingUser: Dispatch<
    SetStateAction<{
      fname: string;
      lname: string;
      email: string;
      password: string;
    }>
  >;
  setInview: Dispatch<SetStateAction<Inview>>;
}

export default SignUpForm;
