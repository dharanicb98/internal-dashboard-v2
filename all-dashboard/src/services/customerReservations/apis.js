import Axios, { getConfigToken } from "utils/axios";
import endPoints from "services/endpoints";

export const getCustomerReservations = async (payload, ctx) => {
  try {
    const response = await Axios.post(
      endPoints.getCustomerReservation(),
      payload,
      getConfigToken(ctx)
    );
    return response.data;
  } catch (error) {
    console.error("Error getting customer reservations", error);
    return null;
  }
};

export const getHostDetails = async (id) => {
  try {
    const response = await Axios.get(`${endPoints.getUser()}/${id}`);
    return response;
  } catch (error) {
    console.error("Error getting host reservations by id", error);
    return null;
  }
};

export const getCustomerDetails = async (id) => {
  try {
    const response = await Axios.get(`${endPoints.getUser()}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting customer reservations by id", error);
    return null;
  }
};

// reviews api calls
export const getReviewChecking = async (payload) => {
  try {
    const response = await Axios.post(`${endPoints.getCheckReview()}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error getting at reviewChecking", error);
    return null;
  }
};

export const getReviewsPost = async (payload) => {
  try {
    const response = await Axios.post(`${endPoints.getPostReviews()}`, payload);
    return response;
  } catch (error) {
    // console.error("Error getting at reviewPosting", error.response.data.error.message[0]);
    throw new Error(error.response.data.error.message[0])
    // return error;
  }
};
