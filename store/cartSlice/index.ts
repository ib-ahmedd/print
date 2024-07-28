import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlteredItems, CartItem } from "@types";
import { deleteCookie, getCookie, setCookie } from "@utils/cookies";
import axios from "axios";

const initialState: InitialState = {
  items: [],
  added: false,
  adding: false,
  loading: true,
  error: false,
  errorMessage: "",
  cartAltered: false,
  cartUpdated: false,
};

export const addToCartLogged = createAsyncThunk(
  "cart/addToCartLogged",
  async ({ item, accessToken }: { item: CartItem; accessToken: string }) => {
    const response = await axios.post(
      "http://localhost:4000/api/add-item",
      item,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async ({ userId, accessToken }: { userId: string; accessToken: string }) => {
    const response = await axios.get(
      `http://localhost:4000/api/get-items/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ itemId, accessToken }: { itemId: string; accessToken: string }) => {
    await axios.delete(`http://localhost:4000/api/delete-item/${itemId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return itemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getNoLog: (state) => {
      const rawCookie = getCookie("CartItems");
      const cartItems: CartItem[] = rawCookie ? JSON.parse(rawCookie) : [];
      cartItems.forEach((item) => state.items.push(item));
      state.loading = false;
    },
    addNoLog: (state, action: PayloadAction<CartItem>) => {
      state.adding = true;
      let exists = false;
      const { payload } = action;
      state.items.forEach((item) => {
        if (item.product_id === payload.product_id) {
          item.quantity = payload.quantity;
          exists = true;
        }
      });
      if (!exists) {
        state.items.unshift(payload);
      }
      setCookie("CartItems", JSON.stringify(state.items), 1);
      state.adding = false;
      state.added = true;
    },

    removeNoLog: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.items = state.items.filter((item) => item.product_id !== payload);
      setCookie("CartItems", JSON.stringify(state.items), 1);
    },
    updateNoLog: (state, action: PayloadAction<CartItem[]>) => {
      const { payload } = action;
      state.items = state.items.filter(() => {});
      payload.forEach((item) => state.items.push(item));
      setCookie("CartItems", JSON.stringify(state.items), 1);
      state.cartAltered = false;
      state.cartUpdated = true;
    },
    clearItemAdded: (state) => {
      state.added = false;
    },
    clearNoLog: (state) => {
      state.items = state.items.filter(() => {});
      deleteCookie("CartItems");
    },
    mergeCartItems: (state, action: PayloadAction<AlteredItems[]>) => {
      const { payload } = action;
      state.items = state.items.map((item) => {
        payload.forEach((alteredItem) => {
          if (alteredItem._id === item._id) {
            item.quantity = alteredItem.quantity;
          }
        });
        return item;
      });
      state.cartAltered = false;
      state.cartUpdated = true;
    },
    cartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    cartAltered: (state, action: PayloadAction<boolean>) => {
      state.cartAltered = action.payload;
    },
    cartUpdated: (state, action: PayloadAction<boolean>) => {
      state.cartUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    // -------get cart items from database-------
    builder
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        const { payload } = action;
        payload.forEach((item: CartItem) => state.items.push(item));
        state.loading = false;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.error.message;
      });

    // ------- add item to cart database----------
    builder
      .addCase(addToCartLogged.pending, (state) => {
        state.adding = true;
      })
      .addCase(addToCartLogged.fulfilled, (state, action) => {
        let exists = false;
        const { payload } = action;
        state.items.forEach((item) => {
          if (item.product_id === payload.product_id) {
            item.quantity = payload.quantity;
            exists = true;
          }
        });
        if (!exists) {
          state.items.unshift(payload);
        }
        state.adding = false;
        state.added = true;
      })
      .addCase(addToCartLogged.rejected, (state, action) => {
        (state.error = true), (state.errorMessage = action.error.message);
      });

    // --------delete item from database----------
    builder
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.cartUpdated = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const { payload } = action;
        state.items = state.items.filter((item) => item._id !== payload);
        state.cartUpdated = true;
        state.loading = false;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        (state.error = true), (state.errorMessage = action.error.message);
      });
  },
});

interface InitialState {
  items: CartItem[];
  added: boolean;
  loading: boolean;
  error: boolean;
  adding: boolean;
  errorMessage: string | undefined;
  cartAltered: boolean;
  cartUpdated: boolean;
}

export const {
  addNoLog,
  getNoLog,
  removeNoLog,
  updateNoLog,
  clearNoLog,
  clearItemAdded,
  mergeCartItems,
  cartAltered,
  cartUpdated,
  cartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
