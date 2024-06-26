import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./reducers/loaderSlice";
import authSlice from "./reducers/authSlice";
import queryBodySlice from "./reducers/queryBodySlice";
import countrySlice from "./reducers/countrySlice";
import attributesSlice from './reducers/listingAttributesSlice'
import regionsSlice from "./reducers/regionSlice";
import destinationSlice from "./reducers/destinationSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
    auth: authSlice,
    queryBody: queryBodySlice,
    country: countrySlice,
    regions: regionsSlice,
    destinations: destinationSlice,
    attributes: attributesSlice,
    users: userSlice
  },
});
