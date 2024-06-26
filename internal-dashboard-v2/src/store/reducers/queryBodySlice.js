import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: { col: "id", orderby: "desc" },
  pagination: { page: 1, limit: 20 },
  filters: [],
};

export const queryBody = createSlice({
  name: "queryBody",
  initialState,
  reducers: {
    applySort: (state, action) => {
      state.sort.col = action.payload.col;
      state.sort.orderby = action.payload.orderby;
    },
    applyPage: (state, action) => {
      state.pagination.page = action.payload.page;
    },
    applyLimit: (state, action) => {
      state.pagination.limit = action.payload.limit;
    },
    applyFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilter: (state) => {
      state.filters = [];
    },
  },
});

export const { applySort, applyPage, applyLimit, applyFilter, resetFilter } =
  queryBody.actions;
export default queryBody.reducer;
