import { useState } from "react";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import { nigerianStatesArray } from "../constants";
import Link from "next/link";
import axios from "axios";
import checkFormComplete from "@utils/checkFormComplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

function CompleteRegister({
  inView,
  pendingUser,
  authToken,
}: CompleteRegisterProps) {
  const [inputs, setInputs] = useState({
    mobile_no: "",
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIncomplete, setFormIncomplete] = useState(false);

  function handleInputs(e: any) {
    setError(false);
    setErrorMessage("");
    setFormIncomplete(false);
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError(false);
    try {
      if (checkFormComplete(inputs, 5)) {
        const userBuild = {
          user_name: `${pendingUser.fname} ${pendingUser.lname}`,
          email: pendingUser.email,
          user_password: pendingUser.password,
          mobile_no: parseInt(inputs.mobile_no),
          address: inputs.address,
          country: inputs.country,
          city: inputs.city,
          state: inputs.state,
        };
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          userBuild,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response);
      } else {
        setError(true);
        setFormIncomplete(true);
        setErrorMessage("Fill all input fields!");
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Internal error, try again!");
    }
    setLoading(false);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={`w-full shrink-0 flex flex-col items-center py-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView === "register" && "-translate-x-full opacity-0"
      } ${inView === "login" && "-translate-x-full opacity-0"} ${
        inView === "OTP" && "-translate-x-full opacity-0"
      } ${inView === "complete" && "translate-x-0 opacity-100"}`}
    >
      <SelectInput
        name="country"
        value={inputs.country}
        handleInputs={handleInputs}
        options={["Nigeria"]}
        loading={loading}
        formIncomplete={formIncomplete}
      />

      <SelectInput
        name="state"
        value={inputs.state}
        handleInputs={handleInputs}
        state
        options={nigerianStatesArray}
        loading={loading}
        formIncomplete={formIncomplete}
      />

      <FormInput
        type="text"
        handleInputs={handleInputs}
        name="city"
        placeholder="City"
        value={inputs.city}
        formIncomplete={formIncomplete}
        loading={loading}
      />
      <FormInput
        type="tel"
        placeholder="Mobile No"
        name="mobile_no"
        value={inputs.mobile_no}
        handleInputs={handleInputs}
        formIncomplete={formIncomplete}
        loading={loading}
      />

      <textarea
        onChange={handleInputs}
        name="address"
        placeholder="Residential Address"
        value={inputs.address}
        className={`w-full border p-2 md:p-4 h-28 focus:outline-none focus:border-dashed text-sm md:text-base ${
          formIncomplete && !inputs.address && "border-red-600 bg-red-50"
        }`}
      />

      {error && (
        <div className="w-full relative">
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
        {loading ? "LOADING..." : "SIGN UP"}
      </button>
      <span className="text-center text-sm">
        <p>By signing up, you agreee to our</p>
        <Link href="/terms" className="text-site-orange">
          Terms and Conditions & Privacy and Policy
        </Link>
      </span>
    </form>
  );
}

interface CompleteRegisterProps {
  authToken: string;
  inView: "register" | "login" | "OTP" | "complete";
  pendingUser: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  };
}

export default CompleteRegister;
