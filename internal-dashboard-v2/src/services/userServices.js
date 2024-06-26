import axios from "axios";
import api from '../api'
import endPoints from "./endPoints";

export function getAllUsers() {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/user/query`, {
    filters: [{ col: "is_deleted", type: "number", val: "0" }],
  });
}

export function createUser(body) {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/user`, body);
}

export function editUser(body, id) {
  return axios.put(`${process.env.REACT_APP_BASE_URL}/user/${id}`, body);
}

export function deleteUser(id) {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/user/` + id);
}

export function getUser(id) {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
}
//
export async function getAllUsersData() {
  try {
    let body = { filters: [{ col: "is_deleted", type: "number", val: "0" }] }
    const response = await api.post( endPoints.getAllUsers(), body )
    return response.data
  }
  catch (e) {
    throw new Error(e)
  } 
}

//
