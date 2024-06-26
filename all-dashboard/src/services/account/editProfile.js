import Axios, { getConfigToken } from "utils/axios";
import endPoints from "services/endpoints";

export const profileImageUpload = async ( payload ) => {
    try {
       const response = await Axios.post(endPoints.uploadImage(), payload)
       return response
    }
    catch (e) {
      throw new Error(e?.response?.data?.error?.message)
    }
}

export const updateProfileData = async (id,  payload ) => {
  try {
    const response = await Axios.put(`${endPoints.getUser()}/${id}`, payload)
    return response
  }
  catch (e) {
    throw new Error(e?.response?.data?.error?.message)
  }
}

export const getUserById = async ( id ) => {
  try {
    const response = await Axios.get(`${endPoints.getUser()}/${id}`)
    return response
  }
  catch (e) {
    throw new Error(e?.response?.data?.error?.message)
  }
}