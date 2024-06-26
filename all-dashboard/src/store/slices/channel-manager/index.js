import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: "",
  tab: "tab1",
  setupLoading: false,
  setup: {},
  mappingLoading: false,
  mapping: {
    data: {
      internal: [],
      vendor: []
    }
  },
};

const channelManagerSlice = createSlice({
  name: "channelManager",
  initialState: initialState,
  reducers: {
    updateVendor: (state, action) => {
      state.vendor = action.payload;
    },
    updateTab: (state, action) => {
      state.tab = action.payload;
    },
    setupLoader: (state, action) => {
      state.setupLoading = action.payload;
      if (action.payload) state.setup = {};
    },
    setSetup: (state, action) => {
      state.setup = action.payload;
    },
    mappingLoader: (state, action) => {
      state.mappingLoading = action.payload;
      if (action.payload) state.mapping = { ...initialState.mapping };
    },
    setMapping: (state, action) => {
      state.mapping = action.payload;
    },
  },
});

export const {
  updateVendor,
  updateTab,
  setupLoader,
  setSetup,
  mappingLoader,
  setMapping,
} = channelManagerSlice.actions;

export default channelManagerSlice.reducer;
