import axios from "axios";

export function getAllCategories() {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/categories`
  );
}
export function deleteCategory(_id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/categories/${_id}`
  );
}
export function createCategory(formData) {
  console.log(formData);
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/category`,
    formData
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
export function updateCategory(data) {
  // console.log(data);
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/category/`,
    data
  );
}
// {{baseurlhkv2}}/api/v2/attributes/list/categories
