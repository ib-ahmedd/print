import { LayoutProps } from "@types";
import React from "react";
import { SideBar } from "./components";

export const metadata = {
  title: "Account - Custom Printing",
  description: "View info about your account",
};

const AccountLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
};

export default AccountLayout;
