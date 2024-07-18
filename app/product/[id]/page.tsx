"use client";
import { useParams } from "next/navigation";

function ProductPage() {
  const { id } = useParams();

  return <main>{id}</main>;
}

export default ProductPage;
