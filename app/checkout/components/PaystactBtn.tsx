import { AppDispatch, RootState } from "@store";
import { subtotal } from "@utils/subtotal";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import "dotenv/config";
import { addOrders, setOrderedItems } from "@store/ordersSlice";
import { useEffect } from "react";
import { emptyCart } from "@store/cartSlice";
function PaystackBtn() {
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsOrdered = useSelector(
    (state: RootState) => state.orders.orderComplete
  );
  const orderLoading = useSelector(
    (state: RootState) => state.orders.ordersLoading
  );

  const dispatch = useDispatch<AppDispatch>();

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: subtotal(cartItems) * 1500 * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY
      ? process.env.NEXT_PUBLIC_PAYSTACK_KEY
      : "",
  };
  const onSuccess = () => {
    dispatch(addOrders({ items: cartItems, user_id: user._id, accessToken }));
  };

  const onClose = () => {
    console.log("closed");
  };

  const paymentInfo = {
    onSuccess,
    onClose,
  };
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (itemsOrdered) {
      dispatch(setOrderedItems(cartItems));
      dispatch(emptyCart());
    }
  }, [itemsOrdered, cartItems]);
  return (
    <button
      className={`w-full rounded-md py-3 bg-site-orange text-white mt-4 ${
        orderLoading && "opacity-40"
      }`}
      disabled={orderLoading}
      onClick={() => {
        initializePayment(paymentInfo);
      }}
    >
      {orderLoading ? "PROCESSING" : "PLACE YOUR ORDER"}
    </button>
  );
}

export default PaystackBtn;
