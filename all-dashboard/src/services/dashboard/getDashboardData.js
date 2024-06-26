import endPoints from "services/endpoints";
import { ListingDataType } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getDashboardData = async (ctx) => {
  try {
    const res = await Axios.get(endPoints.getDashboardData(), getConfigToken(ctx));
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default getDashboardData;
