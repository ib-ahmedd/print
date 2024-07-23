import { useState } from "react";
import FormInput from "./FormInput";
import { Inview } from "../types";

function ForgotEmailForm({ inView }: ForgotEmailFormProps) {
  const [email, setEmail] = useState("");
  return (
    <form
      className={`w-full shrink-0 flex flex-col items-start py-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView === "forgot-email" && "translate-x-0"
      } ${inView !== "forgot-email" && "translate-x-full"}`}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Enter email"
        value={email}
        handleInputs={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className="py-3 w-full bg-site-orange text-white rounded-md">
        PROCEED
      </button>
      <button className="text-site-orange w-fit">Back to login</button>
    </form>
  );
}

interface ForgotEmailFormProps {
  inView: Inview;
}

export default ForgotEmailForm;
