import axios from "axios";

export function getAllPageConfig() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/page-config`);
}

export function deletePageConfig(id) {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/page-config` + id);
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postPageConfig(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/page-config/`,
    formData,
    config
  );
}

export function putPageConfig(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/page-config/${id}`,
    formData
  );
}
