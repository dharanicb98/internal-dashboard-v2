import Axios, { getConfigToken } from "utils/axios";

const getAddons = async (ctx) => {
  try {
    const res = await Axios.get(`${process.env.BASE_URL}/attributes/list/addons`, getConfigToken(ctx))
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export default getAddons;
