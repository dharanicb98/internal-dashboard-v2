import axios from "axios";

export function getAllPaymentTable() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-table`
  );
}

export function deletePaymentTable(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-table/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postPaymentTable(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-table`,
    formData,
    config
  );
}

export function putPaymentTable(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-table/`,
    formData
  );
}
