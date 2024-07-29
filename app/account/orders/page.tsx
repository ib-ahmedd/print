"use client";
import Link from "next/link";
import { PageContainer } from "../components";

function Orders() {
  return (
    <PageContainer heading="Orders">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-base md:text-lg">
        <p>You don't have any orders!</p>
        <Link
          href="/shop"
          className="py-3 md:py-2 px-6 bg-site-orange text-white rounded-md"
        >
          RETURN TO SHOP
        </Link>
      </div>
    </PageContainer>
  );
}

export default Orders;
