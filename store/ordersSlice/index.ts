import PendingReviews from "@app/account/pending-reviews/page";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Order, ReviewItem } from "@types";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  orderedItems: [],
  pendingReviews: [],
  reviewItem: {
    _id: "",
    product_id: "",
    product_name: "",
    product_image: "",
  },
  reviewItemError: false,
  orderComplete: false,
  ordersLoading: true,
  reviewItemLoading: true,
  pendingReviewsLoading: true,
  processingOrder: false,
  orderError: false,
  pendingReviewsError: false,
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

export const getPendingReviews = createAsyncThunk(
  "orders/getPendingReviews",
  async ({
    user_id,
    accessToken,
  }: {
    user_id: string;
    accessToken: string;
  }) => {
    const response = await axios.get(
      `http://localhost:4000/api/pending-reviews/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const getReviewItem = createAsyncThunk(
  "order/getReviewItem",
  async ({
    orderId,
    accessToken,
  }: {
    orderId: string | string[];
    accessToken: string;
  }) => {
    const response = await axios.get(
      `http://localhost:4000/api/review-item/${orderId}`,
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

    // -------------pending reviews--------------------
    builder
      .addCase(getPendingReviews.pending, (state) => {
        state.pendingReviewsLoading = true;
      })
      .addCase(
        getPendingReviews.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.pendingReviews = action.payload;
          state.pendingReviewsLoading = false;
        }
      )
      .addCase(getPendingReviews.rejected, (state, action) => {
        state.pendingReviewsError = true;
        state.errorMessage = action.error.message;
      });

    // ------------get review item------------------
    builder
      .addCase(getReviewItem.pending, (state) => {
        state.reviewItemLoading = true;
      })
      .addCase(
        getReviewItem.fulfilled,
        (state, action: PayloadAction<ReviewItem>) => {
          state.reviewItem = action.payload;
          state.reviewItemLoading = false;
          state.reviewItemError = false;
        }
      )
      .addCase(getReviewItem.rejected, (state, action) => {
        (state.reviewItemError = true),
          (state.errorMessage = action.error.message);
      });
  },
});

interface OrderState {
  orders: Order[];
  orderedItems: CartItem[];
  pendingReviews: Order[];
  reviewItem: ReviewItem;
  orderComplete: boolean;
  ordersLoading: boolean;
  pendingReviewsLoading: boolean;
  reviewItemLoading: boolean;
  orderError: boolean;
  pendingReviewsError: boolean;
  reviewItemError: boolean;
  errorMessage: string | undefined;
  processingOrder: boolean;
}

export const { setOrderedItems, resetItemsOrdered } = ordersSlice.actions;
export default ordersSlice.reducer;
