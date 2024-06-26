import axios from "axios";

export function getAllPets() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/pets/`);
}

export function deletePet(id) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/pets/` + id
  );
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function postPet(formData) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/pets/`,
    formData,
    config
  );
}

export function putPet(formData) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/attributes/list/pets/`,
    formData,
    config
  );
}
