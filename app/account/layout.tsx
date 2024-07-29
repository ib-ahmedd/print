import { LayoutProps } from "@types";
import React from "react";
import { SideBar } from "./components";
import ScreenCover from "./components/ScreenCover";

export const metadata = {
  title: "Account - Custom Printing",
  description: "View info about your account",
};

const AccountLayout = ({ children }: LayoutProps) => {
  return (
    <main className="w-full flex gap-2 lg:gap-8 px-4 lg:px-8 xl:px-40 bg-gray-100 py-8">
      <SideBar />
      <ScreenCover />
      {children}
    </main>
  );
};

export default AccountLayout;
