import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Checkout - Custom Printing",
  description: "Order carted items",
};

const CheckoutLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default CheckoutLayout;
