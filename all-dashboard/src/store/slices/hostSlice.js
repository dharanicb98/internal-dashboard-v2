import { createSlice } from "@reduxjs/toolkit";

export const hostSlice = createSlice({
  name: "hostStore",
  initialState: {
    currentStep : 1, //0 is default step
    hostDetails: null,
    hostPassword: '' //host password to create user entry in user tbl
  },
  reducers: {
    nextStep : (state) => {
      return {...state, currentStep: state.currentStep + 1}
    },
    prevStep : (state) => {
      return {...state, currentStep: state.currentStep - 1}
    },
    updateStep : (state, action) => {
      return {...state, currentStep: action.payload}
    },
    updateHostPassword: ( state, action ) => {
      return {...state, hostPassword:action.payload}
    }

  }
})

export const { nextStep, prevStep, updateStep, updateHostPassword } = hostSlice.actions

export default hostSlice.reducer