import axios from "axios";
import endPoints from "services/endpoints";
import Axios, { getConfigToken } from "utils/axios";

const getAmenitiesGroup = async (ctx) => {
    try {
       //const res = await Axios.post(endPoints.createListing(),data);
       const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attributes/list/amenities-group`, getConfigToken(ctx))
       return res.data.data;
    } 
    catch (error) {
        return null;
    }
};

export default getAmenitiesGroup;
