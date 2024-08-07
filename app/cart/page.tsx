"use client";
import { useDispatch, useSelector } from "react-redux";
import { CartEmpty, CartTotals, ProductsTable } from "./components";
import { RootState } from "@store";
import { useEffect } from "react";
import { cartAltered, cartUpdated, clearItemAdded } from "@store/cartSlice";
import { setRouterState } from "@store/globalSlice";

function Cart() {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearItemAdded());
      dispatch(cartAltered(false));
      dispatch(cartUpdated(false));
      dispatch(setRouterState(""));
    };
  }, []);
  return (
    <main>
      {cartItem.length === 0 ? (
        <CartEmpty />
      ) : (
        <section className="flex-col items-end bg-gray-100 pb-20 pt-4 md:pt-4">
          <ProductsTable />
          <CartTotals />
        </section>
      )}
    </main>
  );
}

export default Cart;
