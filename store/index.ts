import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import globalReducer from "./globalSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
