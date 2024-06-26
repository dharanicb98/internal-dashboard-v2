import axios from "axios";
import api from "../api";
import endPoints from "./endPoints";

export function getAllRegions() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/regions`);
}

export function deleteRegion(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/regions/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postRegion(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/regions`,
    formData,
    config
  );
}

export function putRegion(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/regions/`,
    formData
  );
}

//
export const getALLRegionsData = async () => {
  try {
    const response = await api.get(endPoints.getAllRegions())
    return response.data.data
  }
  catch (e) {
     throw new Error(e)
  }
}