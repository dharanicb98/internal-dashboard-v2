import axios from "axios";
import endPoints from "services/endpoints";
import Axios, { getConfigToken } from "utils/axios";

const createListing = async (data) => {
    try {
       const res = await Axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/new`, data);
       return res
    } 
    catch (error) {
        return error;
    }
};




export default createListing;
