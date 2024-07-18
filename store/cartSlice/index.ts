import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@types";

const initialState: InitialState = {
  cartitems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      state.cartitems.push(action.payload);
    },
  },
});

interface InitialState {
  cartitems: CartItem[];
}

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
