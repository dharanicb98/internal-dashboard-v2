import { AnyAction, combineReducers, configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import userSlice from "./slices/user";
import listingSlice from "./slices/listing";
import locationSlice from "./slices/location";
import amenitiesSlice from "./slices/listing/amenities";
import regionsSlice from './slices/listing/regions';
import destinationsSlice from './slices/listing/destinations'
import countrySlice from './slices/listing/countries'
import rulesSlice from "./slices/listing/rules";
import petsSlice from "./slices/listing/pets";
import addonsSlice from "./slices/listing/addons";
import catagoriesSlice from "./slices/listing/catagories";
import propertyListSlice from "./slices/calendar/propertyList";
import upcomingBookingSlice from "./slices/calendar/upcomingBookings";
import createListingSlice from "./slices/createListing";
import DashboardSlice from "./slices/dashboard";
import accountsSlice from "./slices/accounts";
import chatSlice from "./slices/chat";
import channelManagerSlice from "./slices/channel-manager";
import customerSupportTabsSlice from "./slices/tabs/customerSupport"
import hostSlice from "./slices/hostSlice.js";

const combinedReducer = combineReducers({
  user: userSlice,
  listing: listingSlice,
  location: locationSlice,
  amenities: amenitiesSlice,
  rules: rulesSlice,
  pets: petsSlice,
  addons: addonsSlice,
  catagories: catagoriesSlice,
  propertylist: propertyListSlice,
  upcomingbookings: upcomingBookingSlice,
  createListing: createListingSlice,
  dashboard: DashboardSlice,
  accounts: accountsSlice,
  chat: chatSlice,
  channelManager: channelManagerSlice,
  customerSupportTabs: customerSupportTabsSlice,
  regions: regionsSlice,
  destinations:destinationsSlice,
  hostPage: hostSlice,
  country: countrySlice
});

const masterReducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const store = configureStore({
  reducer: masterReducer,
});

export const makeStore = () => store;

const state = store.getState();
export const wrapper = createWrapper(makeStore);

type Store = ReturnType<typeof makeStore>;

export type RootStoreState = typeof state;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store };
