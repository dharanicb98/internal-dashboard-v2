import axios from "axios";

export function getAllTax() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/tax`);
}

export function deleteTax(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/tax/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postTax(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/tax`,
    formData,
    config
  );
}

export function putTax(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/tax/`,
    formData
  );
}
