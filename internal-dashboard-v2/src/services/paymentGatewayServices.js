import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllPayments = () =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/payment-gateway/query`);

export const updatePayment = (data) =>
  axios.put(
    `${process.env.REACT_APP_BASE_URL}/payment-gateway/` + data.id,
    data
  );

export const deletePayment = (id) =>
  axios.delete(`${process.env.REACT_APP_BASE_URL}/payment-gateway/` + id);

export const createPayment = (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/payment-gateway`, data, config);
