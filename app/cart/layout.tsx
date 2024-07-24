import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Cart - Custom Printing",
  description: "View and update cart items",
};

const CartLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default CartLayout;
