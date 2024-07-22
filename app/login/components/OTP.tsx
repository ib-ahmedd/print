import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function OTP({ email, inView, setInView, setAuthToken }: OTPProps) {
  const [input, setInput] = useState("");
  const [inCorrectOTP, setIncorrectOTP] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email: email, code: input }
      );
      setAuthToken(response.data);
      setInView("complete");
    } catch (err) {
      console.log(err);
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
        inView === "register" && "-translate-x-full opacity-0"
      } ${inView === "login" && "-translate-x-full opacity-0"} ${
        inView === "OTP" && "translate-x-0 opacity-100"
      } ${inView === "complete" && "translate-x-full opacity-0"}`}
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
      {inCorrectOTP && (
        <div className="w-full relative">
          <div className="absolute w-full h-full bg-red-600 opacity-10 rounded-lg" />
          <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faWarning} /> Code incorrect!
          </p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-site-orange text-white py-3 text-sm md:text-base rounded-md ${
          loading && "opacity-40"
        }`}
      >
        {loading ? "LOADING..." : "VERIFY EMAIL"}
      </button>
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
  setInView: Dispatch<
    SetStateAction<"login" | "OTP" | "register" | "complete">
  >;
  email: string;
  inView: "login" | "register" | "OTP" | "complete";
  setAuthToken: Dispatch<SetStateAction<string>>;
}

export default OTP;
