import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addonsSlice = createSlice({
  name: "addons",
  initialState: initialState,
  reducers: {
    updateAddons: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateAddons } = addonsSlice.actions;

export default addonsSlice.reducer;
