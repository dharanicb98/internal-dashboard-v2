import axios from "axios";

export function getAllPaymentTransactions() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-transactions`
  );
}

export function deletePaymentTransactions(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-transactions/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postPaymentTransactions(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-transactions`,
    formData,
    config
  );
}

export function putPaymentTransactions(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/payment-transactions/`,
    formData
  );
}
