import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  countryList: [],
  countryHashMap: {},
};

export const getCountyData = createAsyncThunk("country", async () => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/country`);
    return res.data.data;
  } 
  catch (error) {
    return error.message;
  }
});

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountyData.fulfilled, (state, action) => {
      state.countryList = action.payload;
      state.countryList?.forEach((e) => {
        state.countryHashMap[e?.id] = e;
      });
    });
  },
});

export default countrySlice.reducer;
