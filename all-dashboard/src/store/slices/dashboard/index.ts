import { createSlice} from "@reduxjs/toolkit";
import { DashboardData } from "types/dashboard";

const initialState = {
    data: {} as DashboardData
}

const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState: initialState,
    reducers: {},
})


export default DashboardSlice.reducer;