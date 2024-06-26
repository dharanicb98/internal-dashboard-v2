import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    authFail: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authSuccess, authFail, logout } = authSlice.actions;
export default authSlice.reducer;
