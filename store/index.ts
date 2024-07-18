import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import globalReducer from "./globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
