import endPoints from "services/endpoints";
import Axios, { getConfigToken } from "utils/axios";


const getReservations = async (payload, ctx) => {
  try {
    const res = await Axios.post(endPoints.getHostReservations(), payload, getConfigToken(ctx));
    return res.data;
  } 
  catch (error) {

  }
}


export default getReservations;
