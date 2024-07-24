import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { Inview } from "../types";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";

function ResetOTP({ email, inView, setInView, setAuthToken }: OTPProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countDown, setCountDown] = useState(10);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(false);
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email: email, code: input }
      );
      setAuthToken(response.data);
      setInView("reset-password");
    } catch (err: any) {
      console.log(err);
      if (err.response?.status === 404) {
        setError(true);
        setErrorMessage("Code incorrect!");
      } else {
        setError(true);
        setErrorMessage("Connection error, try again!");
      }
    }
    setLoading(false);
  }

  async function handleResend() {
    setError(false);
    setErrorMessage("");
    try {
      setCountDown(10);
      await axios.post("http://localhost:4000/api/auth/request-otp", {
        email: email,
        method: "reset-password",
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (inView === "reset-OTP") {
        setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setCountDown(10);
      }
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countDown, inView]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`w-full shrink-0 flex flex-col items-center py-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView === "reset-password" && "-translate-x-full opacity-0"
      } ${inView === "reset-OTP" && "translate-x-0 opacity-100"} ${
        inView !== "reset-OTP" &&
        inView !== "reset-password" &&
        "translate-x-full opacity-0"
      }`}
    >
      <h2 className="text-lg font-normal text-center">
        Enter code sent to {email} to verify your email.
      </h2>
      <FormInput
        type="tel"
        name="OTP"
        value={input}
        loading={loading}
        handleInputs={(e) => {
          setError(false);
          setErrorMessage("");
          setInput(e.target.value);
        }}
        placeholder="Enter Code"
      />
      {error && <ErrorDisplay errorMessage={errorMessage} />}
      <SubmitBtn
        title="VERIFY EMAIL"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <div className="flex w-full justify-between">
        <button
          onClick={handleResend}
          disabled={countDown === 0 ? false : true}
          className={`${
            countDown === 0 ? "text-site-orange" : "text-gray-300"
          }`}
        >
          Resend code
          <span className={`ml-2 ${countDown === 0 && "hidden"}`}>
            {countDown}
          </span>
        </button>
        <button
          onClick={() => {
            setInView("forgot-email");
          }}
          className="text-site-orange"
        >
          Wrong Email?
        </button>
      </div>
    </form>
  );
}

interface OTPProps {
  setInView: Dispatch<SetStateAction<Inview>>;
  email: string;
  inView: Inview;
  setAuthToken: Dispatch<SetStateAction<string>>;
}

export default ResetOTP;
