import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    country:[]
}

const countrySlice = createSlice({
    name:'country',
    initialState,
    reducers : {
        updateCountry : (state, action) => {
            state.country = action.payload
        }
    }
})

export const {updateCountry} = countrySlice.actions
export default countrySlice.reducer