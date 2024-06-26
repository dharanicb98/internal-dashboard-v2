import axios from "axios";
import { getCookie } from "cookies-next";
import {
  SERVER_API_URL,
  SERVER_CHAT_API_URL,
  CUSTOMER_RESERVATION_API_URL,
  SERVER_CALENDAR_API_URL,
} from "src/constants/api";
// import { store } from "store/index";

export const CustomerReservationAxios = axios.create({
  baseURL: CUSTOMER_RESERVATION_API_URL,
});

export const CalendarAxios = axios.create({
  baseURL: SERVER_CALENDAR_API_URL,
});

export const ChatAxios = axios.create({
  baseURL: SERVER_CHAT_API_URL,
});

const Axios = axios.create({
  baseURL: SERVER_API_URL,
});

Axios.defaults.withCredentials = true;
Axios.interceptors.request.use(async (request) => {
  // if(store.getState().user.details?.token){
  //   request.headers.Cookie = "accessToken=" + store.getState().user.details?.token;
  // }
  // if (getCookie('accessToken') || global.accessToken) {
  //   request.headers.Cookie = "accessToken=" + (getCookie('accessToken') || global.accessToken)
  // }
  return request;
});


Axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    if (global?.window && window) window.location.href = '/signin';
  }
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    if (global?.window && window) window.location.href = '/signin';
  }
  return Promise.reject(error);
});

export const getConfigToken = (ctx: any) => {
  const config = {
    headers: {
      "Cookie": "accessToken=" + (ctx?.req?.cookies?.accessToken || ""),
    },
  };
  return config
}
export default Axios;
