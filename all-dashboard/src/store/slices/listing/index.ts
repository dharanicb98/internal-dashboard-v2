import { createSlice } from "@reduxjs/toolkit";
import { ListingDataType } from "types/listing";

const initialState = {} as unknown as ListingDataType;

const listingSlice = createSlice({
  name: "listing",
  initialState: initialState,
  reducers: {
    updateListingDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { updateListingDetails } = listingSlice.actions;

export default listingSlice.reducer;
