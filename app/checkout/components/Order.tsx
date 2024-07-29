"use client";
import { RootState } from "@store";
import { subtotal } from "@utils/subtotal";
import { useSelector } from "react-redux";
import PaystackBtn from "./PaystactBtn";
import Link from "next/link";

function Order() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsOrdered = useSelector(
    (state: RootState) => state.orders.orderComplete
  );
  const orderedItems = useSelector(
    (state: RootState) => state.orders.orderedItems
  );
  return (
    <article className="your_order w-full mt-8 md:mt-0 md:w-[46%] lg:w-[30em] border-2 border-gray-300 p-8 h-fit">
      <h2 className="text-xl mb-4">Your order</h2>
      <div>
        <h3>Product</h3>
        <h3>Subtotal</h3>
      </div>
      {!itemsOrdered &&
        cartItems.map((item) => (
          <div key={item._id}>
            <p>
              {item.product_name} × {item.quantity}
            </p>
            <p>${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      {itemsOrdered &&
        orderedItems.map((item) => (
          <div key={item._id}>
            <p>
              {item.product_name} × {item.quantity}
            </p>
            <p>${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      <div>
        <p>Subtotal:</p>
        <p>${subtotal(itemsOrdered ? orderedItems : cartItems).toFixed(2)}</p>
      </div>
      <div>
        <p>Total:</p>
        <p>${subtotal(itemsOrdered ? orderedItems : cartItems).toFixed(2)}</p>
      </div>

      {itemsOrdered ? (
        <Link
          href="/account/orders"
          className="w-full rounded-md py-3 bg-site-orange text-white mt-4 flex justify-center"
        >
          VIEW ORDERS
        </Link>
      ) : (
        <PaystackBtn />
      )}
    </article>
  );
}

export default Order;
