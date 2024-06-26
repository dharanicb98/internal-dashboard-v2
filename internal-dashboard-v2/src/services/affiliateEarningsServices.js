import axios from "axios";

export function getAffiliateEarnings() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/referral-earning/query`);
}

export function deleteAffiliateEarnings(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/referral-earning/` + id
  );
}

export function editAffiliateEarnings(id, formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/referral-earning/` + id,
    formData
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postAffiliateEarnings(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/referral-earning`,
    formData,
    config
  );
}
