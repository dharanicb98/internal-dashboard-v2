import axios from "axios";
import endPoints from "services/endpoints";
import { Amenities } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getDestinations = async (ctx) => {
  try {
    // const res = await Axios.get<APIResponse<Amenities>>(endPoints.getAmenities());
    const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attributes/list/destinations`, getConfigToken(ctx));
    return res.data.data;
  }
  catch (error) {
    return null;
  }
};

export default getDestinations;