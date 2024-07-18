import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
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
  },
});

interface InitialState {
  isLoggedIn: boolean;
  navCartOpen: boolean;
}

export const { toggleNavCart } = globalSlice.actions;

export default globalSlice.reducer;
