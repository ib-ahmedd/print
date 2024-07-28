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
  },
});

interface InitialState {
  user: User;
  accessToken: string;
  isLoggedIn: boolean;
  navCartOpen: boolean;
}

export const { toggleNavCart, handleLogin } = globalSlice.actions;

export default globalSlice.reducer;
