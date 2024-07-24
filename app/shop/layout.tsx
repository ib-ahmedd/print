import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Shop - Custom Printing",
  description: "Our products",
};

const ShopLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default ShopLayout;
