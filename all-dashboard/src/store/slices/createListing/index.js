import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 0,
  data: {
    permalink: "",
    host_id: 0,
    categories: [],
    location_latitude: 37.0902,
    location_longitude: 95.7129,
    address: {
      country_id: "",
      region: "",
      destination: "",
      house: "",
      area: "",
      street: "",
      landmark: "",
      city: "",
      pin: "",
      country: "",
    },
    title: "",
    description: "",
    is_instant_book: false,
    max_allowed_guests: 0,
    max_free_guests: 0,
    max_bookings_days: 0,
    no_of_bedrooms_max: 0,
    no_of_beds_max: 0,
    no_of_washroom_max: 0,
    no_of_pets_allowed: 0,
    no_of_guests_max: 0,
    amenities: [],
    check_in_time: "12:00 AM",
    check_out_time: "12:00 AM",
    quite_hours_from: "12:00 AM",
    quite_hours_to: "12:00 AM",
    is_quite_hours: 0,
    rules: [],
    long_term_discount: [],
    custom_rule: "",
    is_custom_rule: false,
    media: [],
    base_price: 0,
    weekend_price: 0,
    week_price: 0,
    month_price: 0,
    security_deposit: 0,
    price_per_additional_guest: 0,
    status: "draft",
    extra_guests: {
      max_free: 0,
      additional_cost: 0,
    },
    basic_pricing: {
      base_price: 0,
      weekend_price: 0,
      security_deposit: 0,
    },
    currency_symbol: "$",
    currency: "USD",
    room_arrangement: [],
    faq: [],
    nearby: [],
  },
};

const createListingSlice = createSlice({
  name: "createListing",
  initialState: initialState,
  reducers: {
    updateTab: (state, action) => {
      state.tab = action.payload;
    },
    updateData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { updateTab, updateData } = createListingSlice.actions;

export default createListingSlice.reducer;
