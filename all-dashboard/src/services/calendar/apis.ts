import endPoints from "services/endpoints";
import { CalendarAxios } from "utils/axios";
import Axios, { getConfigToken } from "utils/axios";

export const fetchPropertyList = async (ctx) => {
  try {
    const response = await Axios.get(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.fetchPropertyList(), getConfigToken(ctx));
    return response.data;
  } catch (error) {
    console.error("Error fetching data: fetchPropertyList", error.message);
    return null
   
  }
};

export const fetchUpcomingBookings = async (payload) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.fetchUpcomingBookings(), payload, getConfigToken(ctx));

    return response.data;
  } catch (error) {
    console.error("Error fetching data fetchUpcomingBookings:", error.message);
    return null
  }
};

export const blockCalendarDates = async (payload: any) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.blockCalendarDates(), payload);
    return response.data;
  } catch (error) {
    console.error("Error blocking dates:", error.message);
    return null
  }
};

export const unBlockCalendarDates = async (payload: any) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.unBlockCalendarDates(), payload);
    return response.data;
  } catch (error) {
    console.error("Error unblocking dates:", error.message);
    return null
  }
};

export const setNewPrice = async (payload: any) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.setNewPrice(), payload);
    return response.data;
  } catch (error) {
    console.error("Error unblocking dates:", error.message);
    return null
  }
};

export const getBlockedDates = async (payload: any) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.fetchCalendar(), payload);
    return response.data;
  } catch (error) {
    console.error("Error getBlockedDates:", error.message);
    return null
  }
};

export const getPropertyImage = async (payload: any) => {
  try {
    const response = await Axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endPoints.fetchPropertyImage(), payload);
    return response.data;
  } catch (error) {
    console.error("Error getBlockedDates:", error.message);
    return null
  }
};
