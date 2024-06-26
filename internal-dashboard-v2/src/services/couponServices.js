import axios from "axios";

export const getAllCoupons = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/coupons`);

export const updateCoupon = (data) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/attributes/list/coupons/`, data);

export const deleteCoupon = (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/coupons/` + id
  );

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createCoupon = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/coupons`,
    data,
    config
  );
