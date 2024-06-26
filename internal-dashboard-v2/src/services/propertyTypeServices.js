import axios from "axios";

export function getPropertyType() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/property-types`
  );
}

export function deletePropertyType(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/property-types/` + id
  );
}

export function editPropertyType(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/property-types/`,
    formData
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postPropertyType(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/property-types/`,
    formData,
    config
  );
}
