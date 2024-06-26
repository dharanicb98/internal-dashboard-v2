import axios from "axios";

export function getAllEventModules() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/module-event/query`);
}

export function deleteEventModules(id) {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/module-event/` + id);
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postEventModules(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/module-event/`,
    formData,
    config
  );
}

export function putEventModules(formData, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/module-event/${id}`,
    formData
  );
}
