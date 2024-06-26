import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pets } from "types/listing";

const initialState: Pets[] = [];

const petsSlice = createSlice({
  name: "pets",
  initialState: initialState,
  reducers: {
    updatePets: (state, action: PayloadAction<Pets[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updatePets } = petsSlice.actions;

export default petsSlice.reducer;
