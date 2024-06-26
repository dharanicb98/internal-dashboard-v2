import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Regions } from "types/listing";

const initialState: Regions[] = [];

const regionSlice = createSlice({
  name: "regions",
  initialState: initialState,
  reducers: {
    updateRegions: (state, action: PayloadAction<Regions[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateRegions } = regionSlice.actions;

export default regionSlice.reducer;
