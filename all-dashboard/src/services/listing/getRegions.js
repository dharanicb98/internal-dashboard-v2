import endPoints from "services/endpoints";
import Axios, {getConfigToken} from "utils/axios";

const getRegions = async (ctx) => {
  try {
    const res = await Axios.get(endPoints.getRegions(), getConfigToken(ctx));
    // const res = await axios.get(`https://rentmyhotel.com/api/v2/attributes/list/regions`);
    return res.data.data;
  } 
  catch (error) {
    console.log('error get regions', error)
    return null;
  }
};

export default getRegions;