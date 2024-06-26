import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    lat: 0,
    lng: 0,
  },
  reducers: {
    updateCoordinates: (state, action: PayloadAction<LatLng>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateCoordinates } = locationSlice.actions;

export default locationSlice.reducer;
