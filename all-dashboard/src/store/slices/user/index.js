import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logout: false,
  details: { role: 'host' },
};

const accountsSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateTab: (state, action) => {
      state.details = action.payload
    },
    updateUserDetails: (state, action) => {
      state.details = {...state.details, ...action.payload}
    },
    userLogout: (state, action) => {
      state.logout = action.payload;
    },
  },
});

export const { updateTab, updateUserDetails, userLogout } = accountsSlice.actions;

export default accountsSlice.reducer;
