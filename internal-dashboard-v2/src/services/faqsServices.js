import axios from "axios";

export function getAllFaqs() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/faqs`);
}

export function deleteFaqs(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/faqs/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postFaqs(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/faqs`,
    formData,
    config
  );
}

export function putFaqs(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/faqs/`,
    formData
  );
}
