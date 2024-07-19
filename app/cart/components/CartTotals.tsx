"use client";
import { RootState } from "@store";
import { CartItem } from "@types";
import { subtotal } from "@utils/subtotal";
import Link from "next/link";
import { useSelector } from "react-redux";

function CartTotals() {
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.cartitems
  );
  return (
    <article className="mt-8 w-full md:w-[35em] border border-gray-300 flex flex-col gap-4">
      <h2 className="text-base md:text-xl w-full p-3 border-b border-gray-300 bg-gray-50">
        Cart totals
      </h2>
      <div className="w-full flex flex-col gap-4 p-4 text-sm md:text-base">
        <span className="w-full flex justify-between border-b border-gray-300 pb-2">
          <p>Subtotal:</p>
          <p className="w-1/2">${subtotal(cartItems).toFixed(2)}</p>
        </span>
        <span className="w-full flex justify-between border-b border-gray-300 pb-2">
          <p>Total:</p>
          <p className="w-1/2">${subtotal(cartItems).toFixed(2)}</p>
        </span>

        <Link
          href="/checkout"
          className="w-full text-center py-4 rounded-md bg-site-orange hover:bg-site-orange-hover text-white"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </article>
  );
}

export default CartTotals;
