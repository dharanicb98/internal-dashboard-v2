import Axios, { getConfigToken } from "utils/axios";
import endPoints from "services/endpoints";

//tax payer
export const getTaxPayerByUserId = async ( id  ) => {
    try {
      const response = await Axios.get(`${endPoints.getUser()}/${id}/tax-payer`)
      return response
    }
    catch (e) {
        throw new Error(e?.response?.data?.error?.message)
    }
}

export const updateTaxPayer = async (id,  payload ) => {
    try {
      const response = await Axios.put(`${endPoints.getUser()}/${id}/tax-payer`, payload)
      return response
    }
    catch (e) {
      throw new Error(e?.response?.data?.error?.message)
    }
}

//vat payer
export const getVatPayerByUserId = async ( id  ) => {
  try {
    const response = await Axios.get(`${endPoints.getUser()}/${id}/vat`)
    return response
  }
  catch (e) {
    throw new Error(e?.response?.data?.error?.message)
  }
}

export const updateVatPayer = async (id,  payload ) => {
  try {
    const response = await Axios.put(`${endPoints.getUser()}/${id}/vat`, payload)
    return response
  }
  catch (e) {
    throw new Error(e?.response?.data?.error?.message)
  }
}