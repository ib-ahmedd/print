"use client";

import useGetProducts from "@hooks/useGetProducts";
import { ProductsSection } from "@components";

function MostLoved() {
  const { products, loading } = useGetProducts("/most-loved");
  return (
    <>
      <ProductsSection
        heading="Most Loved"
        products={products}
        skeletonCount={4}
        loading={loading}
      />
    </>
  );
}

export default MostLoved;
