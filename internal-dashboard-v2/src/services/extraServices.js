import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllExtraServices = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/extra-services`);

export const updateExtraService = (data) => {
  console.log("--------------------", data);
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/extra-services/`,
    data
  );
};

export const deleteExtraService = (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/extra-services/` + id
  );

export const createExtraService = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/extra-services`,
    data,
    config
  );
