import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Order } from "@types";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  orderedItems: [],
  orderComplete: false,
  ordersLoading: true,
  processingOrder: false,
  orderError: false,
  errorMessage: "",
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async ({
    user_id,
    accessToken,
  }: {
    user_id: string;
    accessToken: string;
  }) => {
    const response = await axios.get(
      `http://localhost:4000/api/get-orders/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

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
    resetItemsOrdered: (state) => {
      state.orderComplete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        const { payload } = action;
        state.orders = payload;
        state.ordersLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        (state.orderError = true), (state.errorMessage = action.error.message);
      });

    // ---------------add orders builder------------------------------
    builder
      .addCase(addOrders.pending, (state) => {
        state.processingOrder = true;
      })
      .addCase(addOrders.fulfilled, (state) => {
        state.orderComplete = true;
        state.processingOrder = false;
      })
      .addCase(addOrders.rejected, (state, action) => {
        state.orderError = true;
        state.errorMessage = action.error.message;
        state.processingOrder;
      });
  },
});

interface OrderState {
  orders: Order[];
  orderedItems: CartItem[];
  orderComplete: boolean;
  ordersLoading: boolean;
  orderError: boolean;
  errorMessage: string | undefined;
  processingOrder: boolean;
}

export const { setOrderedItems, resetItemsOrdered } = ordersSlice.actions;
export default ordersSlice.reducer;
