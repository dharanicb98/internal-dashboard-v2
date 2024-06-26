import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  upcomingBooking: [],
};



const upcomingBookingSlice = createSlice({
  name: "upcomingbooking",
  initialState: initialState,
  reducers: {
    updateUpcomingBooking: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateUpcomingBooking } = upcomingBookingSlice.actions;

export default upcomingBookingSlice.reducer;
