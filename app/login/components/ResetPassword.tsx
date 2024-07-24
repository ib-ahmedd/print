import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { Inview } from "../types";
import ErrorDisplay from "./ErrorDisplay";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ResetPassword({
  email,
  inView,
  setInView,
  authToken,
}: ResetPasswordProps) {
  const [inputs, setInputs] = useState({
    new_password: "",
    conf_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  function handleInputs(e: any) {
    setError(false);
    setErrorMessage("");
    setPasswordMatch(true);
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    setPasswordMatch(true);
    try {
      if (inputs.new_password === inputs.conf_password) {
        await axios.post(
          "http://localhost:4000/api/auth/reset-password",
          { email: email, password: inputs.new_password },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setResetSuccess(true);
      } else {
        setError(true);
        setErrorMessage("Passwords do not match!");
        setPasswordMatch(false);
      }
    } catch (err: any) {
      console.log(err);
      setError(true);
      setErrorMessage("Connection error, try again!");
    }
    setLoading(false);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`w-full shrink-0 flex flex-col items-center py-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView === "reset-password"
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      } `}
    >
      {!resetSuccess && (
        <>
          <FormInput
            type="password"
            name="new_password"
            placeholder="Enter new password"
            handleInputs={handleInputs}
            value={inputs.new_password}
            loading={loading}
            passwordsMatch={passwordMatch}
          />
          <FormInput
            type="password"
            name="conf_password"
            placeholder="Enter new password"
            handleInputs={handleInputs}
            value={inputs.conf_password}
            loading={loading}
            passwordsMatch={passwordMatch}
          />

          {error && <ErrorDisplay errorMessage={errorMessage} />}
          <SubmitBtn
            title="RESET PASSWORD"
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </>
      )}

      {resetSuccess && (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-[15em] md:max-w-[35em] rounded-xl relative">
          <div className="absolute w-full h-full bg-green-500 opacity-10 rounded-xl" />
          <div className="flex flex-col items-center text-site-green-light p-4 z-10 text-center">
            <p className="font-bold flex flex-col md:flex-row items-center md:items-baseline gap-2">
              <span className="bg-green-500 min-w-7 min-h-7 rounded-full text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              Your password has been reset.
            </p>
            <p>Use new password to sign in.</p>
          </div>
          <button
            className="bg-site-orange hover:bg-site-orange-hover text-white text-sm py-2 px-8 rounded z-10"
            onClick={() => {
              setInView("login");
            }}
          >
            Back to login
          </button>
        </div>
      )}
    </form>
  );
}

interface ResetPasswordProps {
  email: string;
  inView: Inview;
  authToken: string;
  setInView: Dispatch<SetStateAction<Inview>>;
}

export default ResetPassword;
