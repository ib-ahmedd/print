import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@types";

const initialState: InitialState = {
  appLoaded: false,
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
    handleAppLoaded: (state) => {
      state.appLoaded = true;
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
}

export const {
  toggleNavCart,
  handleLogin,
  handleAccountSideBar,
  handleAppLoaded,
} = globalSlice.actions;

export default globalSlice.reducer;
