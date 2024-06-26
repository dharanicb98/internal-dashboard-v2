import axios from "axios";
import endPoints from "services/endpoints";
import { Pets } from "types/listing";
import Axios, { getConfigToken } from "utils/axios";

const getPets = async (ctx) => {
  try {
    // const res = await Axios.get<APIResponse<Pets[]>>(endPoints.getPets());
    const res = await Axios.get(`${process.env.BASE_URL}/attributes/list/pets`, getConfigToken(ctx))
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export default getPets;
