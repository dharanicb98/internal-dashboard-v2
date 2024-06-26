import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllUsersData } from "../../services/userServices"
import { userTypesConstants } from "../../constants/userConstants"

const initialState = {
    // hostData: [],
    // adminData: [],
    allUsers: [],
    hostAndAdmin:[]
}

export const getUsers =  createAsyncThunk('users', async () => {
    try {
       const users = await getAllUsersData();

    //    const hosts = users && users?.filter((user) => user.user_role === userTypesConstants.USER_ROLE_HOST);

    //    const admins = users && users?.filter((user) => user.user_role === userTypesConstants.USER_ROLE_ADMIN);

       //const usersData = users && users?.filter((user) => user.user_role === userTypesConstants.USER_ROLE_CUSTOMER);

       const hostsAdmins = users && users?.filter((user) => user.user_role === userTypesConstants.USER_ROLE_ADMIN || user.user_role === userTypesConstants.USER_ROLE_HOST)

       return {allUsers: users, hostAndAdmin: hostsAdmins}
    }
    catch ( e )  {
       console.log('error in getting user data in global state', e)
    }
})


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, ( state, action ) => {
            state.allUsers = action.payload.allUsers
            // state.hostData = action.payload.hostData
            // state.adminData = action.payload.adminData
            state.hostAndAdmin = action.payload.hostAndAdmin
        })
    }
})

export default userSlice.reducer