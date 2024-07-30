import { Order } from "@types";
import Link from "next/link";
import OrderedItem from "./OrderedItem";

function OrdersContainer({ orders, activeOrders }: OrdersContainerProps) {
  return (
    <div className="w-full shrink-0 top-0 left-0 flex flex-row flex-wrap md:flex-col justify-between transition duration-150">
      {orders.map((item) => (
        <OrderedItem key={item._id} {...item} />
      ))}
      {orders.length === 0 && (
        <div className="w-full mt-28 flex flex-col gap-4 justify-center items-center text-base md:text-lg">
          <p>You don't have any {activeOrders} orders.</p>
          <Link
            href="/shop"
            className="py-3 md:py-2 px-6 bg-site-orange text-white rounded-md"
          >
            RETURN TO SHOP
          </Link>
        </div>
      )}
    </div>
  );
}

interface OrdersContainerProps {
  orders: Order[];
  activeOrders: "open" | "closed";
}
export default OrdersContainer;
