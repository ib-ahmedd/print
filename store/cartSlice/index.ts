import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@types";
import { getCookie, setCookie } from "@utils/cookies";

const initialState: InitialState = {
  cartitems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    get: (state) => {
      const rawCookie = getCookie("CartItems");
      const cartItems: CartItem[] = rawCookie ? JSON.parse(rawCookie) : [];
      cartItems.forEach((item) => state.cartitems.push(item));
    },
    add: (state, action: PayloadAction<CartItem>) => {
      let exists = false;
      const { payload } = action;
      state.cartitems.forEach((item) => {
        if (item._id === payload._id) {
          item.quantity = item.quantity + payload.quantity;
          exists = true;
        }
      });
      if (!exists) {
        state.cartitems.push(payload);
      }
      setCookie("CartItems", JSON.stringify(state.cartitems), 1);
    },

    remove: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.cartitems = state.cartitems.filter((item) => item._id !== payload);
      setCookie("CartItems", JSON.stringify(state.cartitems), 1);
    },
  },
});

interface InitialState {
  cartitems: CartItem[];
}

export const { add, get, remove } = cartSlice.actions;

export default cartSlice.reducer;
