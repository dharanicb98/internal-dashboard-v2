import { useSelector } from "react-redux";
import { RootStoreState } from "..";

export const useListingDetailsSelector = () =>
  useSelector((state: RootStoreState) => state.listing);

export const useAmenitiesSelector = () =>
  useSelector((state: RootStoreState) => state.amenities);

export const useRulesSelector = () =>
  useSelector((state: RootStoreState) => state.rules);

export const usePetsSelector = () =>
  useSelector((state: RootStoreState) => state.pets);

export const useCatagoriesSelector = () =>
  useSelector((state: RootStoreState) => state.catagories);

export const useRegionsSelector = () =>
  useSelector((state: RootStoreState) => state.regions);

export const useDestinationsSelector = () =>
  useSelector((state: RootStoreState) => state.destinations);

export const useCountrySelector = () =>
  useSelector((state: RootStoreState) => state.country);

export const useAllListingsSelector = () =>
  useSelector((state: RootStoreState) => state.listings);

export const useHashMapListing = () =>
  useSelector((state: RootStoreState) => state.listingHashMap);
