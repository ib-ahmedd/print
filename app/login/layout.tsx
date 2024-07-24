import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Sign in - Custom Printing",
  description: "Sign into print",
};

const LoginLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default LoginLayout;
