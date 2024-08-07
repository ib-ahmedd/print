"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, RootState } from "@store";
import { setRouterState, toggleNavCart } from "@store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { subtotal } from "@utils/subtotal";
import Link from "next/link";
import { useEffect } from "react";
import { getNoLog, getUserCart } from "@store/cartSlice";
import { NavCartItemSkeleton, NavCartItem } from "./components";

function NavCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartLoading = useSelector((state: RootState) => state.cart.loading);
  const cartOpen = useSelector((state: RootState) => state.global.navCartOpen);
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserCart({ userId: user._id, accessToken: accessToken }));
    } else {
      dispatch(getNoLog());
    }
  }, [isLoggedIn]);

  return (
    <aside
      className={`w-full sm:w-4/5 md:w-1/2 lg:w-1/3 fixed h-screen right-0 top-0 z-40 bg-white flex flex-col justify-between transition-transform duration-150 ${
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
          <div className="h-[64%] overflow-y-auto px-4">
            {!cartLoading &&
              cartItems.map((item) => (
                <NavCartItem
                  key={item._id}
                  {...item}
                  accessToken={accessToken}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            {cartLoading &&
              cartItems.map((item) => <NavCartItemSkeleton key={item._id} />)}
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
              onClick={() => {
                dispatch(setRouterState("/checkout"));
              }}
              href={isLoggedIn ? "/checkout" : "/login"}
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
