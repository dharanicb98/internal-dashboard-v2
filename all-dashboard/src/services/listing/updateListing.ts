import axios from "axios";
import endPoints from "services/endpoints";
import { ListingDataType } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const updateListing = async (  listingId: string,  data: Partial<ListingDataType>) => {
  try {
    // const res = await Axios.put<APIResponse<string>>(
    //   endPoints.getListingById(listingId),
    //   data
    // );
    const res = await Axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/${listingId}`, data)
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default updateListing;
