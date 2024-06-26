import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HouseRules } from "types/listing";

const initialState: HouseRules[] = [];

const rulesSlice = createSlice({
  name: "rules",
  initialState: initialState,
  reducers: {
    updateRules: (state, action: PayloadAction<HouseRules[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateRules } = rulesSlice.actions;

export default rulesSlice.reducer;
