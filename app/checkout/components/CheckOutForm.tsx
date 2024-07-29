"use client";
import { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import SelectInput from "./SelectInput";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { useRouter } from "next/navigation";
import OrderSuccess from "./OrderSuccess";

function CheckOutForm() {
  const user = useSelector((state: RootState) => state.global.user);
  const appLoaded = useSelector((state: RootState) => state.global.appLoaded);
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const itemsOrdered = useSelector(
    (state: RootState) => state.orders.orderComplete
  );

  const router = useRouter();

  useEffect(() => {
    if (appLoaded && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);
  return (
    <form className="w-full md:w-1/2 checkout_form flex flex-col gap-4">
      {itemsOrdered && <OrderSuccess />}
      {!itemsOrdered && (
        <>
          <h2 className="text-lg border-b pb-2">Billing details</h2>
          <div className="flex gap-8 justify-between">
            <LabeledInput
              type="text"
              title="Name"
              htmlName="name"
              value={user.user_name}
            />
          </div>

          <SelectInput
            htmlName="country"
            title="Country / Region"
            value={user.country}
          />

          <LabeledInput
            type="text"
            title="Town/City"
            htmlName="city"
            value={user.city}
          />

          <SelectInput htmlName="state" title="State" value={user.state} />

          <div className="flex flex-col">
            <label className="font-bold text-sm">
              Address <span className="text-red-600">*</span>
            </label>
            <textarea
              className="p-2 h-20 border "
              value={user.address}
              disabled
            />
          </div>

          <LabeledInput
            type="tel"
            title="Phone"
            htmlName="phone"
            value={user.mobile_no}
          />

          <LabeledInput
            type="email"
            title="Email"
            htmlName="email"
            value={user.email}
          />
        </>
      )}
    </form>
  );
}

export default CheckOutForm;
