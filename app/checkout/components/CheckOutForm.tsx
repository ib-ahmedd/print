"use client";
import { useState } from "react";
import LabeledInput from "./LabeledInput";
import SelectInput from "./SelectInput";

function CheckOutForm() {
  const [inputs, setInputs] = useState({
    fname: "Ibrahim",
    lname: "Ahmed",
    country: "Nigeria",
    city: "Kaduna",
    state: "Kaduna",
    address: "No 1, Kogun Street, NDC",
    phone: "+2348161615860",
    email: "ahmed@gmail.com",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <form className="w-full md:w-1/2 checkout_form flex flex-col gap-4">
      <h2 className="text-lg border-b pb-2">Billing details</h2>
      <div className="flex gap-8 justify-between">
        <LabeledInput
          type="text"
          title="First name"
          htmlName="fname"
          value={inputs.fname}
          handleChange={handleChange}
        />
        <LabeledInput
          type="text"
          title="Last name"
          htmlName="lname"
          value={inputs.lname}
          handleChange={handleChange}
        />
      </div>

      <SelectInput
        htmlName="country"
        title="Country / Region"
        value={inputs.country}
        handleChange={handleChange}
      />

      <LabeledInput
        type="text"
        title="Town/City"
        htmlName="city"
        value={inputs.city}
        handleChange={handleChange}
      />

      <SelectInput
        htmlName="state"
        title="State"
        value={inputs.state}
        handleChange={handleChange}
      />

      <div className="flex flex-col">
        <label className="font-bold text-sm">
          Address <span className="text-red-600">*</span>
        </label>
        <textarea
          className="p-2 h-20 border "
          value={inputs.address}
          disabled
          onChange={handleChange}
        />
      </div>

      <LabeledInput
        type="tel"
        title="Phone"
        htmlName="phone"
        value={inputs.phone}
        handleChange={handleChange}
      />

      <LabeledInput
        type="email"
        title="Email"
        htmlName="email"
        value={inputs.email}
        handleChange={handleChange}
      />
    </form>
  );
}

export default CheckOutForm;