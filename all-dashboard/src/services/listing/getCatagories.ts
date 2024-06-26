import axios from "axios";
import endPoints from "services/endpoints";
import { Catagories } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getCatagories = async (ctx) => {
  try {
    const res = await Axios.get<APIResponse<Catagories[]>>( endPoints.getCatagories(), getConfigToken(ctx));
    // console.log('api response',endPoints.getCatagories())
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attributes/list/categories`)
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export default getCatagories;
