import axios from "axios";

export function getAmentiesGroup() {
  return axios.get("https://rentmyhotel.com/api/v2/attributes/list/amenities-group");
}
export function deleteAmentiesGroup(id) {
  return axios.delete(
    `https://rentmyhotel.com/api/v2/attributes/list/amenities-group/${id}`
  );
}
export function createAmentiesGroup(data) {
  // console.log(data);
  return axios.post(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities-group",
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
export function updateAmentiesGroup(data) {
  // console.log(data);
  return axios.put(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities-group/",
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
