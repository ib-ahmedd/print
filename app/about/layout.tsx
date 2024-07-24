import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "About - Custom Printing",
  description: "About us",
};

const AboutLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default AboutLayout;
