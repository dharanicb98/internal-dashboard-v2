import axios from "axios";

export function getAllGiftCard() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/gift-card`
  );
}

export function deleteGiftCard(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/gift-card/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postGiftCard(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/gift-card`,
    formData,
    config
  );
}

export function putGiftCard(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/gift-card/`,
    formData
  );
}
