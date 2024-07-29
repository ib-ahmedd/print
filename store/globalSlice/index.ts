import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@types";
import { setCookie } from "@utils/cookies";

const initialState: InitialState = {
  user: {
    _id: "",
    user_name: "",
    email: "",
    mobile_no: "",
    country: "",
    state: "",
    city: "",
    address: "",
  },
  accessToken: "",
  isLoggedIn: false,
  navCartOpen: false,
  accountSideBarOpen: true,
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
    handleAccountSideBar: (state, action: PayloadAction<boolean>) => {
      state.accountSideBarOpen = action.payload;
    },
  },
});

interface InitialState {
  user: User;
  accessToken: string;
  isLoggedIn: boolean;
  navCartOpen: boolean;
  accountSideBarOpen: boolean;
}

export const { toggleNavCart, handleLogin, handleAccountSideBar } =
  globalSlice.actions;

export default globalSlice.reducer;
