import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkFormComplete from "@utils/checkFormComplete";
import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

function SignUpForm({ inView, setPendingUser, setInview }: SignUpFormProps) {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    conf_password: "",
  });

  const [formIncomplete, setFormIncomplete] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputs(e: any) {
    setFormIncomplete(false), setPasswordsMatch(true), setErrorMessage("");
    setSendError(false);
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setSendError(false);
    setFormIncomplete(false);
    if (checkFormComplete(inputs, 5)) {
      if (inputs.password === inputs.conf_password) {
        if (inputs.password.length > 5) {
          try {
            await axios.post("http://localhost:4000/api/auth/request-otp", {
              email: inputs.email,
            });
            setPendingUser(inputs);
            setInview("OTP");
          } catch (err) {
            setSendError(true);
            setErrorMessage("Error connecting to server, try again!");
            console.log(err);
          }
        } else {
          setSendError(true);
          setErrorMessage("Password should contain 6 or more characters!");
          setPasswordsMatch(false);
        }
      } else {
        setSendError(true);
        setPasswordsMatch(false);
        setErrorMessage("Passwords do not match!");
      }
    } else {
      setSendError(true);
      setFormIncomplete(true);
      setErrorMessage("Fill all input fields!");
    }
    setLoading(false);
  }
  return (
    <form
      className={`login_form w-full shrink-0 transition duration-150 absolute top-0 left-0 flex flex-col gap-4 py-8 ${
        inView === "register" && "translate-x-0 opacity-100"
      } ${inView === "login" && "-translate-x-full opacity-0"} ${
        inView === "OTP" && "translate-x-full opacity-0"
      } ${inView === "complete" && "translate-x-full opacity-0"}`}
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
      {sendError && (
        <div className="relative">
          <div className="absolute w-full h-full bg-red-600 opacity-10 rounded-lg" />
          <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faWarning} /> {errorMessage}
          </p>
        </div>
      )}
      <button
        disabled={loading}
        className={`w-full py-3 rounded-md bg-site-orange text-white text-sm md:text-base ${
          loading && "opacity-40"
        }`}
      >
        {loading ? "LOADING..." : "REGISTER"}
      </button>
    </form>
  );
}

interface SignUpFormProps {
  inView: "login" | "register" | "OTP" | "complete";
  setPendingUser: Dispatch<
    SetStateAction<{
      fname: string;
      lname: string;
      email: string;
      password: string;
    }>
  >;
  setInview: Dispatch<
    SetStateAction<"login" | "register" | "OTP" | "complete">
  >;
}

export default SignUpForm;
