import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false, errorMessage: "" };

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loaderStart: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    loaderSuccess: (state) => {
      state.isLoading = false;
      state.errorMessage = "";
    },
    error: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { loaderStart, loaderSuccess, error } = loaderSlice.actions;
export default loaderSlice.reducer;
