import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Account - Custom Printing",
  description: "View info about your account",
};

const AccountLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default AccountLayout;
