import { fallBackUser } from "@constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsType, User } from "@types";

const initialState: InitialState = {
  appLoaded: false,
  user: fallBackUser,
  accessToken: "",
  isLoggedIn: false,
  navCartOpen: false,
  accountSideBarOpen: true,
  recentlyViewed: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleNavCart: (state) => {
      state.navCartOpen = !state.navCartOpen;
    },
    handleLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      const { payload } = action;
      state.user = { ...state.user, ...payload.user };
      state.accessToken = payload.accessToken;
      state.isLoggedIn = true;
    },
    handleLogOut: (state) => {
      (state.isLoggedIn = false), (state.user = fallBackUser);
      state.accessToken = "";
      localStorage.removeItem("UserInfo");
    },
    handleAccountSideBar: (state, action: PayloadAction<boolean>) => {
      state.accountSideBarOpen = action.payload;
    },
    handleAppLoaded: (state) => {
      state.appLoaded = true;
    },
    getRecent: (state) => {
      const recentlyViewed: ProductsType[] = JSON.parse(
        localStorage.getItem("recently-viewed") || "[]"
      );
      state.recentlyViewed = recentlyViewed;
    },
    addToRecent: (state, action: PayloadAction<ProductsType>) => {
      const { payload } = action;
      const itemExists = state.recentlyViewed.find(
        (item) => item._id === payload._id
      );
      if (itemExists) {
        const updatedState = state.recentlyViewed.filter(
          (item) => item._id !== payload._id
        );
        state.recentlyViewed = updatedState;
      }
      state.recentlyViewed.unshift(payload);
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed.pop();
      }
      localStorage.setItem(
        "recently-viewed",
        JSON.stringify(state.recentlyViewed)
      );
    },
  },
});

interface InitialState {
  appLoaded: boolean;
  user: User;
  accessToken: string;
  isLoggedIn: boolean;
  navCartOpen: boolean;
  accountSideBarOpen: boolean;
  recentlyViewed: ProductsType[];
}

export const {
  toggleNavCart,
  handleLogin,
  handleAccountSideBar,
  handleAppLoaded,
  addToRecent,
  getRecent,
  handleLogOut,
} = globalSlice.actions;

export default globalSlice.reducer;
