import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [],
    listingHashMap: {}
}


const allListingSlice = createSlice({
    name :'allListing',
    initialState,
    reducers: {
        updateAllListing : (state, action) => {
            state.listings = action.payload

            return state
        },
        updateHashMap: ( state, action ) => {
            state.listingHashMap = action.payload
            return state
        }
    }
})

export const { updateAllListing, updateHashMap } = allListingSlice.actions;

export default allListingSlice.reducer