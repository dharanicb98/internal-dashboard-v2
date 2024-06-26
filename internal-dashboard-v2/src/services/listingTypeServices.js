import axios from "axios";

export const getAllTypes = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/listing-types`);

export const updateType = (data) =>
  axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/listing-types/`,
    data
  );

export const deleteType = (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/listing-types/` + id
  );

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createType = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/listing-types`,
    data,
    config
  );
