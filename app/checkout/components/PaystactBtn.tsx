import { AppDispatch, RootState } from "@store";
import { subtotal } from "@utils/subtotal";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import "dotenv/config";
import { addOrders } from "@store/ordersSlice";
function PaystackBtn() {
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const orderLoading = useSelector(
    (state: RootState) => state.orders.processingOrder
  );

  const dispatch = useDispatch<AppDispatch>();

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: parseInt((subtotal(cartItems) * 1500 * 100).toString()),
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
      {orderLoading ? "PROCESSING..." : "PLACE YOUR ORDER"}
    </button>
  );
}

export default PaystackBtn;
