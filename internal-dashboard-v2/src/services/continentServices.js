import axios from "axios";

//https:rentmyhotel.com/api/v2/attributes/list/continent

export function getAllContinent() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/continent`);
}
export function deleteContinent(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/continent/${id}`
  );
}
export function createContinent(data) {
  // console.log(data);
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/continent`,
    data
  );
}
export function updateContinent(data) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/continent`,
    data
  );
}

