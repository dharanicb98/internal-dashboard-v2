import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAddons,
  getAllExtraServices,
  getAllOffers,
  getAllAmenitiesGroup,
  getAllCategories,
  getAllAmenitiesGroupQuery,
  getAllHouseRules,
  getAllProcessingFee,
  getAllListingTypes,
  getAllAmenities,
} from "../../services/listingsServices";
import { generateHashmap } from "../../utils/common";

const initialState = {
  categories: { data: [], hashMap: {} },
  amenitiesQuery: { data: [], hashMap: {} },
  amenitiesGroup: { data: [], hashMap: {} },
  amenities: { data: [], hashMap: {} },
  houseRules: { data: [], hashMap: {} },
  offers: { data: [], hashMap: {} },
  addons: { data: [], hashMap: {} },
  extraServices: { data: [], hashMap: {} },
  processingFee: { data: [], hashMap: {} },
  listingTypes: { data: [], hashMap: {} },
};

export const getCategories = createAsyncThunk("categories", async () => {
  try {
    const data = await getAllCategories();
    return data;
  } catch (e) {
    console.log("error in state management in catgories", e);
  }
});

export const getAmenitiesGroup = createAsyncThunk(
  "amenitiesGroup",
  async () => {
    try {
      const data = await getAllAmenitiesGroup();
      return data;
    } catch (e) {
      console.log("error in state management in amenitiesGroup", e);
    }
  }
);

export const getAmenitiesData = createAsyncThunk("amenitiesData", async () => {
  try {
    const data = await getAllAmenities();
    return data;
  } catch (e) {
    console.log("error in state management in catgories", e);
  }
});
export const getAmenities = createAsyncThunk("amenities", async () => {
  try {
    const data = await getAllAmenitiesGroupQuery();
    return data;
  } catch (e) {
    console.log("error in state management in amenities", e);
  }
});

export const getHouseRules = createAsyncThunk("houserules", async () => {
  try {
    const data = await getAllHouseRules();
    return data;
  } catch (e) {
    console.log("error in state management in house rules", e);
  }
});

export const getOffers = createAsyncThunk("offers", async () => {
  try {
    const data = await getAllOffers();
    return data;
  } catch (e) {
    console.log("error in state management in offers", e);
  }
});

export const getAddons = createAsyncThunk("addons", async () => {
  try {
    const addons = await getAllAddons();

    const hashMap = generateHashmap(addons);

    return { addons, hashMap };
  } catch (e) {
    console.log("error in state management in addons", e);
  }
});

export const getExtraServices = createAsyncThunk("extra-services", async () => {
  try {
    const extraServices = await getAllExtraServices();
    const hashMap = generateHashmap(extraServices);

    return { extraServices, hashMap };
  } catch (e) {
    console.log("error in state management in extra services", e);
  }
});

export const getProcessingFee = createAsyncThunk("processing-fee", async () => {
  try {
    const data = await getAllProcessingFee();
    return data;
  } catch (e) {
    console.log("error in state management processing fee", e);
  }
});

export const getListingTypes = createAsyncThunk("listingTypes", async () => {
  try {
    const data = await getAllListingTypes();
    return data;
  } catch (e) {
    console.log("error in state management listing types", e);
  }
});

const attributesSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.data = action.payload;
      })
      .addCase(getAmenitiesGroup.fulfilled, (state, action) => {
        state.amenitiesGroup.data = action.payload;
      })
      .addCase(getAmenities.fulfilled, (state, action) => {
        state.amenitiesQuery.data = action.payload;
      })
      .addCase(getHouseRules.fulfilled, (state, action) => {
        state.houseRules.data = action.payload;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers.data = action.payload;
      })
      .addCase(getAddons.fulfilled, (state, action) => {
        state.addons.data = action.payload.addons;
        state.addons.hashMap = action.payload.hashMap;
      })
      .addCase(getExtraServices.fulfilled, (state, action) => {
        state.extraServices.data = action.payload.extraServices;
        state.extraServices.hashMap = action.payload.hashMap;
      })
      .addCase(getProcessingFee.fulfilled, (state, action) => {
        state.processingFee.data = action.payload;
      })
      .addCase(getListingTypes.fulfilled, (state, action) => {
        state.listingTypes.data = action.payload;
      })
      .addCase(getAmenitiesData.fulfilled, (state, action) => {
        state.amenities.data = action.payload;
      });
  },
});

export default attributesSlice.reducer;
