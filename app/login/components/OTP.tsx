import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Inview } from "../types";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";

function OTP({ email, inView, setInView, setAuthToken }: OTPProps) {
  const [input, setInput] = useState("");
  const [inCorrectOTP, setIncorrectOTP] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email: email, code: input }
      );
      setAuthToken(response.data);
      setInView("complete");
    } catch (err: any) {
      console.log(err);
      setError(true);
      if (err.response.status === 404) {
        setErrorMessage("Incorrect code!");
      } else {
        setErrorMessage("Connection error, try again!");
      }
    }
    setLoading(false);
  }

  async function handleResend() {
    try {
      setCountDown(10);
      await axios.post("http://localhost:4000/api/auth/request-otp", {
        email: email,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (inView === "OTP") {
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
        inView !== "complete" &&
        inView !== "OTP" &&
        "-translate-x-full opacity-0"
      } ${inView === "OTP" && "translate-x-0 opacity-100"} ${
        inView === "complete" && "translate-x-full opacity-0"
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
          setIncorrectOTP(false);
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
            setInView("register");
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

export default OTP;
