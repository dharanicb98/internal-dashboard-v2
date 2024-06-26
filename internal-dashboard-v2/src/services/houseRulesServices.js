import axios from "axios";

export function getHouseRules() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/houserules`
  );
}

export function deleteHouseRules(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/houserules/` + id
  );
}

export function editHouseRules(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/houserules/`,
    formData
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postHouseRules(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/houserules/`,
    formData,
    config
  );
}
