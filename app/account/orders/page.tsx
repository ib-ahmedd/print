"use client";
import Link from "next/link";
import { PageContainer } from "../components";
import { useEffect, useState } from "react";
import { OrderedItem, OrderSkeleton } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { getOrders } from "@store/ordersSlice";
import OrdersContainer from "./components/OrdersContainer";

function Orders() {
  const [activeOrders, setActiveOrders] = useState<"open" | "closed">("open");
  const appLoaded = useSelector((state: RootState) => state.global.appLoaded);
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const orders = useSelector((state: RootState) => state.orders.orders);
  const loading = useSelector((state: RootState) => state.orders.ordersLoading);
  const dispatch = useDispatch<AppDispatch>();

  const openOrders = orders.filter((item) => !item.delivered);
  const closedOrders = orders.filter((item) => item.delivered);

  useEffect(() => {
    if (appLoaded) {
      dispatch(getOrders({ user_id: user._id, accessToken }));
    }
  }, [appLoaded]);
  return (
    <PageContainer heading="Orders">
      <div className="w-full">
        <div className="w-full border-b flex">
          <button
            onClick={() => {
              setActiveOrders("open");
            }}
            className={`font-semibold py-2 px-4 ${
              activeOrders === "open" &&
              "text-site-orange border-b-2 border-site-orange"
            }`}
          >
            Open Orders ({openOrders.length})
          </button>
          <button
            onClick={() => {
              setActiveOrders("closed");
            }}
            className={`font-semibold py-2 px-4 ${
              activeOrders === "closed" &&
              "text-site-orange border-b-2 border-site-orange"
            }`}
          >
            Closed Orders ({closedOrders.length})
          </button>
        </div>
        <div className="w-full p-2">
          {loading && <OrderSkeleton />}
          {!loading && activeOrders === "open" && (
            <OrdersContainer orders={openOrders} activeOrders={activeOrders} />
          )}

          {!loading && activeOrders === "closed" && (
            <OrdersContainer
              orders={closedOrders}
              activeOrders={activeOrders}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Orders;
