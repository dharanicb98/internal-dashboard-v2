import axios from "axios";

export function getOffers() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/offers`);
}

export function deleteOffers(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/offers/` + id
  );
}

export function editOffers(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/offers/`,
    formData
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postOffers(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/offers/`,
    formData,
    config
  );
}
