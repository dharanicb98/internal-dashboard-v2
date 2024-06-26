import axios from "axios";

export function getAllSystemVariables() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/system-variable/query`);
}

export function deleteSystemVariables(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/system-variable/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postSystemVariables(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/system-variable/`,
    formData,
    config
  );
}

export function putSystemVariables(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/system-variable/${id}`,
    formData
  );
}
