import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Destinations } from "types/listing";

const initialState: Destinations[] = [];

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: initialState,
  reducers: {
    updateDestinations: (state, action: PayloadAction<Destinations[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateDestinations } = destinationsSlice.actions;

export default destinationsSlice.reducer;
