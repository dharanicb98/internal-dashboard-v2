import axios from "axios";

export function getAmenties() {
  return axios.get(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities"
  );
}

export function getAmenitiesGroup() {
  return axios.get(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities-group/query"
  );
}


export function deleteAmenties(id) {
  return axios.delete(
    `https://rentmyhotel.com/api/v2/attributes/list/amenities/${id}`
  );
}
export function createAmenties(data) {
  // console.log(data);
  return axios.post(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities",
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
export function updateAmenties(data) {
  // console.log(data);
  return axios.put(
    "https://rentmyhotel.com/api/v2/attributes/list/amenities",
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
