"use client";
import useGetProducts from "@app/hooks/useGetProducts";
import { ProductsSection } from "@components";

function Featured() {
  const { products, loading } = useGetProducts("/featured-products");
  return (
    <>
      <ProductsSection heading="Featured Products" products={products} />
    </>
  );
}

export default Featured;
