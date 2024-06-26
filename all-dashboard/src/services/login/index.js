import Axios, { getConfigToken } from "utils/axios";
import endPoints from "services/endpoints";

export const signUpUser = async ( payload ) => {
    try {
       const response = await Axios.post(endPoints.signUpUser(), payload)
       return response
    }
    catch (e) {
      throw new Error(e?.response?.data?.error?.message)
    }
}

export const signInUser = async ( payload ) => {
    try {
        const response = await Axios.post(endPoints.signInUser(), payload)
        return response
    }
    catch (e) {
       throw new Error(e?.response?.data?.error?.message)
    }
}

export const validateToken = async (token) => {
    try {
        const response = await Axios.get(endPoints.validateToken() + '?accessToken='+ token)
        return response
    }
    catch (e) {
       throw new Error(e?.response?.status)
    }
}