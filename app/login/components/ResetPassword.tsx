import { Dispatch, SetStateAction, useState } from "react";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { Inview } from "../types";
import ErrorDisplay from "./ErrorDisplay";

function ResetPassword({ inView, setInView }: ResetPasswordProps) {
  const [inputs, setInputs] = useState({
    new_password: "",
    conf_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputs(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    try {
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
        inView === "reset-password" && "-translate-x-full opacity-0"
      } ${inView === "reset-OTP" && "translate-x-0 opacity-100"} ${
        inView !== "reset-OTP" &&
        inView !== "reset-password" &&
        "translate-x-full opacity-0"
      }`}
    >
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
    </form>
  );
}

interface ResetPasswordProps {
  inView: Inview;
  setInView: Dispatch<SetStateAction<Inview>>;
}

export default ResetPassword;
