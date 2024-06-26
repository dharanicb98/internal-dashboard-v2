import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getALLRegionsData } from "../../services/regionServices";
import { generateHashmap } from "../../utils/common";

const initialState = {
    regions: {data:[], hashMap:{}}
}

export const getRegions = createAsyncThunk('region', async () => {
    try {
      const data = await getALLRegionsData()
      const hashMap = generateHashmap(data)
      return {regions: data || [], hashMap: hashMap ||{} }
    }
    catch ( e ) {
       console.log('error in state mangement get regions', e)
    }
})

 const regionsSlice = createSlice({
    name:'regions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(getRegions.fulfilled, (state, action) => {
          state.regions.data = action.payload.regions
          state.regions.hashMap = action.payload.hashMap
       })
    }
})

export default regionsSlice.reducer