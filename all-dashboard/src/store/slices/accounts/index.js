import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: 'profile',
};

const accountsSlice = createSlice({
    name: "accounts",
    initialState: initialState,
    reducers: {
        updateTab: (state, action) => {
            state.tab = action.payload
        },
    },
});

export const { updateTab } = accountsSlice.actions;

export default accountsSlice.reducer;
