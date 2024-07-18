"use client";
import useGetProducts from "@hooks/useGetProducts";
import { ProductsSection } from "@components";

function Featured() {
  const { products, loading } = useGetProducts("/featured-products");
  return (
    <>
      <ProductsSection
        heading="Featured Products"
        products={products}
        loading={loading}
        skeletonCount={4}
      />
    </>
  );
}

export default Featured;
