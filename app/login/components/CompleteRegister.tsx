import { useState } from "react";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import { nigerianStatesArray } from "../constants";
import Link from "next/link";
import axios from "axios";
import checkFormComplete from "@utils/checkFormComplete";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "@store/globalSlice";
import { useRouter } from "next/navigation";
import { Inview } from "../types";
import SubmitBtn from "./SubmitBtn";
import ErrorDisplay from "./ErrorDisplay";
import { RootState } from "@store";
import { clearNoLog } from "@store/cartSlice";

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

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const routerState = useSelector(
    (state: RootState) => state.global.routerState
  );
  const router = useRouter();

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
        let postedItems = 0;
        cartItems.forEach(async (item) => {
          await axios.post(
            "http://localhost:4000/api/add-item",
            { ...item, user_id: response.data.user._id },
            {
              headers: {
                Authorization: `Bearer ${response.data.accessToken}`,
              },
            }
          );
          postedItems = postedItems + 1;
          if (postedItems === cartItems.length) {
            dispatch(clearNoLog());
            dispatch(handleLogin(response.data));
            localStorage.setItem("UserInfo", JSON.stringify(response.data));
            router.push(routerState !== "" ? routerState : "/account/overview");
          }
        });
      } else {
        setError(true);
        setFormIncomplete(true);
        setErrorMessage("Fill all input fields!");
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage(routerState !== "" ? routerState : "/account/overview");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`w-full shrink-0 flex flex-col items-center pt-8 gap-4 transition duration-150 absolute top-0 left-0 ${
        inView !== "complete" && "-translate-x-full opacity-0"
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

      {error && <ErrorDisplay errorMessage={errorMessage} />}

      <SubmitBtn
        title="SIGN UP"
        handleSubmit={handleSubmit}
        loading={loading}
      />
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
  inView: Inview;
  pendingUser: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  };
}

export default CompleteRegister;
