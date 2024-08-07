"use client";
import { PageContainer } from "@app/account/components";
import Link from "next/link";
import React, { useEffect } from "react";
import { InfoCard, PageSkeleton } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { useParams, useRouter } from "next/navigation";
import { getOrder } from "@store/ordersSlice";
import { CartItem } from "@types";
import { addToCartLogged, setBuyAgainItem } from "@store/cartSlice";
import { setRouterState } from "@store/globalSlice";

function OrderDetails() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const appLoaded = useSelector((state: RootState) => state.global.appLoaded);
  const order = useSelector((state: RootState) => state.orders.orderDetails);
  const loading = useSelector(
    (state: RootState) => state.orders.orderDetailsLoading
  );

  const addLoading = useSelector((state: RootState) => state.cart.adding);
  const added = useSelector((state: RootState) => state.cart.added);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  function handleBuyAgain() {
    const cartItemBuild: CartItem = {
      user_id: user._id,
      product_id: product_id,
      product_name: product_name,
      product_image: product_image,
      price: price,
      quantity: 1,
    };

    dispatch(
      addToCartLogged({ item: cartItemBuild, accessToken: accessToken })
    );
    dispatch(setRouterState("buy-again"));
    dispatch(setBuyAgainItem({ product_name: product_name, quantity: 1 }));
  }

  const {
    _id,
    product_id,
    product_name,
    product_image,
    quantity,
    price,
    date_ordered,
    delivered,
  } = order;
  useEffect(() => {
    if (appLoaded) {
      dispatch(getOrder({ order_id: id, accessToken: accessToken }));
    }
  }, [appLoaded]);

  useEffect(() => {
    if (added === true) {
      router.push("/cart");
    }
  }, [added]);
  return (
    <PageContainer heading="Order Details" backBtn backPath="/account/orders">
      {loading && <PageSkeleton />}
      {!loading && (
        <div className="p-2">
          <div className="border-b pb-2">
            <h2 className="text-lg">Order #{_id}</h2>
            <p>{quantity} Items.</p>
            <p>Placed on: {date_ordered}</p>
            <p>Total: ${(price * quantity).toFixed(2)}</p>
          </div>

          <div>
            <h2 className="text-lg border-b py-2">Items in Your Order</h2>
            <div className="flex flex-col md:flex-row gap-2 my-2 p-2 border rounded-md">
              <img
                src={product_image}
                alt={product_name}
                className="w-full md:w-[7em] object-contain"
              />
              <div className="flex-1">
                <p>Status: {delivered ? "Delivered" : "Processing"}</p>
                <p>On: {date_ordered}</p>
                <p>QTY: {quantity}</p>
                <p>Price: ${price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleBuyAgain}
                  disabled={addLoading}
                  className={`w-full md:w-fit py-2 px-6 text-white bg-site-orange rounded-md ${
                    addLoading && "opacity-40"
                  }`}
                >
                  {addLoading ? "PROCESSING..." : "BUY AGAIN"}
                </button>
                <Link
                  className="font-semibold text-site-orange underline"
                  href={`/product/${product_id}`}
                >
                  VIEW PRODUCT
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
            <InfoCard
              heading="Payment Information"
              subHeading1="Payment method"
              subHeading2="Payment details"
              desc="Pay with Cards, Bank Transfer or USSD"
            >
              <p>Unit price: ${price}</p>
              <p>Quantity: {quantity}</p>
              <p>Total: ${(price * quantity).toFixed(2)}</p>
            </InfoCard>
            <InfoCard
              heading="Delivery Information"
              subHeading1="Delivery method"
              subHeading2="Shipping details"
              desc="Pick-up station"
            >
              <p>Address: {user.address}</p>
              <p>Mobile No: +234{user.mobile_no}</p>
            </InfoCard>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default OrderDetails;
