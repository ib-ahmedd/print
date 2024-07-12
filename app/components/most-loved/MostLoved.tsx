"use client";

import useGetProducts from "@app/hooks/useGetProducts";
import { ProductsSection } from "@components";

function MostLoved() {
  const { products, loading } = useGetProducts("/most-loved");
  return (
    <>
      <ProductsSection heading="Most Loved" products={products} />
    </>
  );
}

export default MostLoved;
