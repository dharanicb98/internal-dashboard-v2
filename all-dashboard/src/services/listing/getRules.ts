import axios from "axios";
import endPoints from "services/endpoints";
import { HouseRules } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getRules = async (ctx) => {
  try {
    // const res = await Axios.get<APIResponse<HouseRules[]>>(endPoints.getRules());
    // console.log('house rules', res.data.data)
    const res = await Axios.get(`${process.env.BASE_URL}/attributes/list/houserules`, getConfigToken(ctx))
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export default getRules;
