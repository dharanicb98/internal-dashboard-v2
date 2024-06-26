import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Amenities } from "types/listing";

const initialState: Amenities = {
  amenities: [],
  amenitiesCategory: [],
};

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState: initialState,
  reducers: {
    updateAmenities: (state, action: PayloadAction<Amenities>) => {
      state.amenities = action.payload.amenities;
      state.amenitiesCategory = action.payload.amenitiesCategory
      return state;
    },
    updateAmenitiesGroup: (state, action) => {
       state.amenitiesCategory = action.payload;
       return state
    }
  },
});

export const { updateAmenities, updateAmenitiesGroup } = amenitiesSlice.actions;

export default amenitiesSlice.reducer;
