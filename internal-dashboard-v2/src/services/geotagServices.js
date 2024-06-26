import axios from "axios";

export function getAllGeotags() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/geotags/`
  );
}

export function deleteGeotag(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/geotags/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postGeotag(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/geotags/`,
    formData,
    config
  );
}

export function putGeotag(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/geotags/`,
    formData
  );
}
