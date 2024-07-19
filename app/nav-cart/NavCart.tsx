"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@store";
import { toggleNavCart } from "@store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import NavCartItem from "./components/NavCartItem";
import { subtotal } from "@utils/subtotal";
import Link from "next/link";
import { useEffect } from "react";
import { get } from "@store/cartSlice";
import { deleteCookie } from "@utils/cookies";

function NavCart() {
  const cartOpen = useSelector((state: RootState) => state.global.navCartOpen);
  const cartItems = useSelector((state: RootState) => state.cart.cartitems);
  const dispatch = useDispatch();

  //   deleteCookie("CartItems");

  useEffect(() => {
    dispatch(get());
  }, []);

  return (
    <aside
      className={`w-1/3 fixed h-screen right-0 top-0 z-40 bg-white flex flex-col justify-between transition-transform duration-150 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 border-b h-[8%]">
        <h3>Shopping cart</h3>
        <button
          onClick={() => {
            dispatch(toggleNavCart());
          }}
          className="text-xl"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      {cartItems.length < 1 && (
        <>
          <div className="w-full flex justify-center items-center flex-1">
            {cartItems.length < 1 && <p>No products in cart.</p>}
          </div>
          <div className="w-full flex py-4 px-4">
            <Link
              href="/shop"
              className="bg-site-orange text-white w-full py-2 rounded-md text-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="h-[64%] overflow-y-scroll px-4">
            {cartItems.map((item) => (
              <NavCartItem key={item._id} {...item} />
            ))}
          </div>

          <div className="w-full border-y flex items-center justify-between px-4 h-[8%]">
            <p>Subtotal:</p>
            <p>${subtotal(cartItems).toFixed(2)}</p>
          </div>

          <div className="w-full flex flex-col justify-center px-4 gap-4 text-center h-[20%]">
            <Link
              href="/cart"
              className="bg-site-orange text-white w-full py-2 rounded-md"
            >
              VIEW CART
            </Link>
            <Link
              href="/checkout"
              className="bg-site-orange text-white w-full py-2 rounded-md"
            >
              CHECKOUT
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}

export default NavCart;
