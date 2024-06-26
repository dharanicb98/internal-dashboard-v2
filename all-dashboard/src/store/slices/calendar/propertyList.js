import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  propertyList: {},
  selectedProperty: {},
  calendar_loader: false,
  calendar: {}
};



const propertyListSlice = createSlice({
  name: "propertylist",
  initialState: initialState,
  reducers: {
    updatePropertyList: (state, action) => {
      return {
        ...state,
        propertyList: action.payload,
      }
    },
    setSelectedPropertyList: (state, action) => {
      return {
        ...state,
        selectedProperty: action.payload
      }
    },
    setCalendarList: (state, action) => {
      return {
        ...state,
        calendar: action.payload
      }
    },
    setCalendarLoader: (state, action) => {
      return {
        ...state,
        calendar_loader: action.payload
      }
    },
  },
});

export const { updatePropertyList, setSelectedPropertyList, setCalendarLoader, setCalendarList } = propertyListSlice.actions;

export default propertyListSlice.reducer;
