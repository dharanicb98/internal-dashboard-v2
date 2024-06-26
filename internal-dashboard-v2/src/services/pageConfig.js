import api from "../api";
import endPoints from "./endPoints";

export const getAllPages = async () => {
  try {
    const response = await api.get(endPoints.getAllPages());
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const createPage = async (payload) => {
  try {
    // console.log("createPagefunction Called----", payload);
    const response = await api.post(endPoints.getAllPages(), payload);
    return response;
  } catch (e) {
    throw new Error(e);
    // return null;
  }
};

export const getPageById = async (id) => {
  try {
    const response = await api.get(endPoints.getPageById(id));
    return response;
  } catch (e) {
    throw new Error(e);
    // return null;
  }
};

export const updatePage = async (id, payload) => {
  // console.log("updatePage called", id, payload);
  try {
    const response = await api.put(endPoints.getPageById(id), payload);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const deletePage = async (id) => {
  try {
    const response = await api.delete(endPoints.getPageById(id));
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
