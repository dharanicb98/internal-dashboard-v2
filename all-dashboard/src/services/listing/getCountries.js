import endPoints from "services/endpoints";
import Axios, { getConfigToken } from "utils/axios";

const getCountries = async (ctx) => {
  try {
    const res = await Axios.get(endPoints.getCountry(), getConfigToken(ctx));
    return res.data.data;
  }
  catch (error) {
    return null;
  }
};

export default getCountries;