import axios from "axios";

export function getAllReferrals() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/referral/query`);
}

export function deleteReferral(id) {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/referral/` + id);
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postReferral(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/referral/`,
    formData,
    config
  );
}

export function putReferral(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/referral/${formData.id}`,
    formData
  );
}
