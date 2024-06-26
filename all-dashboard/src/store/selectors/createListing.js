import { useSelector } from "react-redux";

export const useCreateListingTabSelector = () =>
    useSelector((state) => state.createListing.tab);

export const useCreateListingDataSelector = () =>
    useSelector((state) => state.createListing.data);
