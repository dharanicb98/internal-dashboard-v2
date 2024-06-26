import axios from "axios";

export function getFacilities() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/facilities`
  );
}

export function deleteFacilities(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/facilities/` + id
  );
}

export function editFacilities(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/facilities/`,
    formData
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postFacilities(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/facilities/`,
    formData,
    config
  );
}
