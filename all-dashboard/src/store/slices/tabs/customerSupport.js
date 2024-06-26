import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "chat",
};

const customerSupportTabsSlice = createSlice({
  name: "customersupporttabs",
  initialState: initialState,
  reducers: {
    updateTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { updateTab } = customerSupportTabsSlice.actions;

export default customerSupportTabsSlice.reducer;
