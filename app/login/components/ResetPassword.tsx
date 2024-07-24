import { useState } from "react";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

function ResetPassword() {
  const [inputs, setInputs] = useState({
    new_password: "",
    conf_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  function handleInputs(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {}
  return (
    <form>
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
      <SubmitBtn
        title="RESET PASSWORD"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </form>
  );
}

export default ResetPassword;
