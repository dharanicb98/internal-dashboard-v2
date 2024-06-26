import endPoints from "services/endpoints";
import Axios, { getConfigToken } from "utils/axios";

export const checkSetup = async (vendor: string) => {
  try {
    const response = await Axios.get(
      endPoints.getChannelManagerSetup() +
        "?vendor=" +
        String(vendor).toLowerCase()
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const createSetup = async (vendor: string, formData: object) => {
  try {
    const response = await Axios.post(
      endPoints.getChannelManagerSetup() +
        "?vendor=" +
        String(vendor).toLowerCase(),
      formData
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const updateSetup = async (vendor: string, formData: object) => {
  try {
    const response = await Axios.put(
      endPoints.getChannelManagerSetup() +
        "?vendor=" +
        String(vendor).toLowerCase(),
      formData
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const deleteSetup = async (vendor: string) => {
  try {
    const response = await Axios.delete(
      endPoints.getChannelManagerSetup() +
        "?vendor=" +
        String(vendor).toLowerCase()
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const dropdownMapping = async (vendor: string) => {
  try {
    const response = await Axios.get(
      endPoints.getChannelManagerMapping() +
        "/dropdown?vendor=" +
        String(vendor).toLowerCase()
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const saveMapping = async (vendor: string, formData: object) => {
  try {
    const response = await Axios.post(
      endPoints.getChannelManagerMapping() +
        "?vendor=" +
        String(vendor).toLowerCase(),
      formData
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const getMapping = async (vendor: string) => {
  try {
    const response = await Axios.get(
      endPoints.getChannelManagerMapping() +
        "?vendor=" +
        String(vendor).toLowerCase()
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const deleteMapping = async (vendor: string, formData: object) => {
  try {
    const response = await Axios.delete(
      endPoints.getChannelManagerMapping() +
        "?vendor=" +
        String(vendor).toLowerCase(),
      { data: formData }
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};

export const importVendorListing = async (vendor: string, id: string) => {
  try {
    const response = await Axios.post(
      endPoints.getChannelManagerMapping() +
        "/import?vendor=" +
        String(vendor).toLowerCase(),
      {
        listing_id: id,
      }
    );
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message?.[0] || error.message,
    };
  }
};
