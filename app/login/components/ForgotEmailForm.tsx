import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import { Inview } from "../types";
import axios from "axios";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";

function ForgotEmailForm({
  inView,
  setInView,
  setPasswordResetEmail,
}: ForgotEmailFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    try {
      await axios.post(
        "https://print-server-wxgg.onrender.com/api/auth/request-otp",
        {
          email: email,
          method: "reset-password",
        }
      );
      setPasswordResetEmail(email);
      setInView("reset-OTP");
    } catch (err: any) {
      console.log(err);
      setError(true);
      if (err.response?.status === 404) {
        setErrorMessage("Email is not registered!");
      } else {
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
      className={`w-full shrink-0 flex flex-col items-start py-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView === "forgot-email" && "translate-x-0"
      } ${
        (inView === "reset-OTP" || inView === "reset-password") &&
        "-translate-x-full opacity-0"
      } ${
        inView !== "reset-OTP" &&
        inView !== "reset-password" &&
        inView !== "forgot-email" &&
        "translate-x-full opacity-0"
      }`}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Enter email"
        value={email}
        loading={loading}
        handleInputs={(e) => {
          setError(false);
          setErrorMessage("");
          setEmail(e.target.value);
        }}
      />

      {error && <ErrorDisplay errorMessage={errorMessage} />}

      <SubmitBtn
        title="PROCEED"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <button
        onClick={() => {
          setInView("login");
        }}
        className="text-site-orange w-fit"
        disabled={loading}
      >
        Back to login
      </button>
    </form>
  );
}

interface ForgotEmailFormProps {
  inView: Inview;
  setInView: Dispatch<SetStateAction<Inview>>;
  setPasswordResetEmail: Dispatch<SetStateAction<string>>;
}

export default ForgotEmailForm;
