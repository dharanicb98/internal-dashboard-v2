import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDestinationsData } from "../../services/destinationsServices";
import { generateHashmap } from "../../utils/common";

const initialState = {
    destinations: {data:[], hashMap: {}}

}

export const getDestionations = createAsyncThunk('destination', async () => {
    try {
       const data  = await getDestinationsData();
       const hashMap = generateHashmap(data);
       return { destinations: data || [], hashMap: hashMap ||{} }
    }
    catch (e) {
        console.log('error in global state destinations')
    }
}) 


const destinationsSlice = createSlice({
    name:'destinations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDestionations.fulfilled, (state, action) => {
            state.destinations.data = action.payload.destinations;
            state.destinations.hashMap = action.payload.hashMap;
        })
    }
})

export default destinationsSlice.reducer