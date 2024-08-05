"use client";
import useGetProducts from "@hooks/useGetProducts";
import { ProductsSection } from "@components";

function Featured() {
  const { products, loading } = useGetProducts("/featured-products");
  // console.log(products);
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
