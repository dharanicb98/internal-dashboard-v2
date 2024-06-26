import axios from "axios";
import endPoints from "services/endpoints";
import { Amenities } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getAmenities = async (ctx) => {
  try {
    // const res = await Axios.get<APIResponse<Amenities>>(endPoints.getAmenities());
    const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attributes/list/amenities-group/query`, getConfigToken(ctx));
    return res.data.data;
  } 
  catch (error) {
    return null;
  }
};

export default getAmenities;
