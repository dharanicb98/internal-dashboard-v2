import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Catagories } from "types/listing";

const initialState: Catagories[] = [];

const catagoriesSlice = createSlice({
  name: "catagories",
  initialState: initialState,
  reducers: {
    updateCatagories: (state, action: PayloadAction<Catagories[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateCatagories } = catagoriesSlice.actions;

export default catagoriesSlice.reducer;
