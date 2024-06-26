import axios from "axios";

export function getAllActivities() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/activites-attractions`
  );
}
export function deleteActivities(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/activites-attractions/${id}`
  );
}
export function createActivities(data) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/activites-attractions/`,
    data
  );
}
// {{baseurlhkv2}}/attributes/list/categories
export function updateActivities(data, id) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/activites-attractions/`,
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
