import axios from "axios";
import api from '../api'
import endPoints from "./endPoints";

export const getAllDestinations = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/destinations`);

export const updateDestination = (data) =>
  axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/destinations/`,
    data
  );

export const deleteDestination = (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/destinations/` + id
  );

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createDestination = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/destinations`,
    data
  );


export const getDestinationsData = async () => {
    try {
      const response = await api.get(endPoints.getAllDestinations())
      return response.data.data
    }
    catch ( e ) {
      throw new Error( e )
    }
}