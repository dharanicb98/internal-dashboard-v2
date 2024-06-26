import endPoints from "services/endpoints";
import { ListingDataType } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

export const getAllListings = async (ctx) => {
  try {
    const res = await Axios.get( endPoints.getListing(1, 10), getConfigToken(ctx));
    // const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/list/:20/:20`)
    // console.log(res)
    return res.data.data
  } catch (error) {
    return null;
  }
};


