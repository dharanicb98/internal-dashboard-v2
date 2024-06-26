import axios from "axios";

export function getAllCountrys() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/country`);
}

export function deleteCountrys(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/country/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postCountrys(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/country`,
    formData,
    config
  );
}

export function putCountrys(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/country/`,
    formData
  );
}
