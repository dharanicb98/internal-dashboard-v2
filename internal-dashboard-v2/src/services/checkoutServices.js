import axios from "axios";

export function getAllCheckout() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/checkout/query`);
}

export function deleteCheckout(id) {
  // console.log(",,,,,,,,,,,,,,,,", id);
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/checkout/` + id);
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postCheckout(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/checkout/`,
    formData,
    config
  );
}

export function putCheckout(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/checkout/${id}`,
    formData
  );
}

export function updateCheckoutSteps(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/checkout/step/${id}`,
    formData
  );
}

export function getCheckout(id) {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/checkout/${id}`);
}

export function getListingId() {
  return axios.get(`https://rentmyhotel.com/api/v2/listing/list/:1/:20`);
}
