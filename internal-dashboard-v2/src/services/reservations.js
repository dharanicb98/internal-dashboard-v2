import axios from "axios";

export function getAllReservations() {
  return axios.post("https://rentmyhotel.com/api/v2/reservations/query");
}
export function deleteReservations(id) {
  return axios.delete(`https://rentmyhotel.com/api/v2/reservations/${id}`);
}
export function createReservations(data) {
  // console.log(data);
  return axios.post("https://rentmyhotel.com/api/v2/reservations/query", data);
}
// {{baseurlhkv2}}/api/v2/reservations/query
export function updateReservations(data, id) {
  // console.log(data);
  return axios.put(`https://rentmyhotel.com/api/v2/reservations/${id}`, data);
}
// {{baseurlhkv2}}/api/v2/reservations/query
