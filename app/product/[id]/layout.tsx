import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Product - Custom Printing",
  description: "Details of product",
};

const ProductLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default ProductLayout;
