import axios from "axios";

export function getAllAddons() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/addons`);
}

export function deleteAddons(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/addons/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postAddons(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/addons`,
    formData,
    config
  );
}

export function putAddons(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/addons`,
    formData
  );
}
