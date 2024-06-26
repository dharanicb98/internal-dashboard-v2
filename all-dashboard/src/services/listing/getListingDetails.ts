import axios from "axios";
import endPoints from "services/endpoints";
import { ListingDataType } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getListingDetails = async (listingId: string, ctx) => {
  try {
    // const res = await Axios.get<APIResponse<ListingDataType>>(
    //   endPoints.getListingById(listingId)
    // );
    const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/${listingId}`, getConfigToken(ctx))
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default getListingDetails;
