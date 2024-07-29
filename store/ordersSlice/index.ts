import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, orders } from "@types";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  orderedItems: [],
  orderComplete: false,
  ordersLoading: false,
  orderError: false,
  errorMessage: "",
};

export const addOrders = createAsyncThunk(
  "orders/addOrders",
  async ({
    items,
    user_id,
    accessToken,
  }: {
    items: CartItem[];
    user_id: string;
    accessToken: string;
  }) => {
    const response = await axios.post(
      "http://localhost:4000/api/add-orders",
      { orders: items, user_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderedItems: (state, action: PayloadAction<CartItem[]>) => {
      const { payload } = action;
      payload.forEach((item) => state.orderedItems.unshift(item));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(addOrders.fulfilled, (state) => {
        state.orderComplete = true;
      })
      .addCase(addOrders.rejected, (state, action) => {
        state.orderError = true;
        state.errorMessage = action.error.message;
      });
  },
});

interface OrderState {
  orders: orders[];
  orderedItems: CartItem[];
  orderComplete: boolean;
  ordersLoading: boolean;
  orderError: boolean;
  errorMessage: string | undefined;
}

export const { setOrderedItems } = ordersSlice.actions;
export default ordersSlice.reducer;
