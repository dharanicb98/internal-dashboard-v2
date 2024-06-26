import axios from "axios";
import api from "../api";
import endPoints from "./endPoints";


// //
// export function getAllListings() {
//   return axios.get(
//     `${process.env.REACT_APP_BASE_URL}/listing/list/:page/:pagesize`
//   );
// }

export function updateListings(id, body) {
  return axios.put(
    `${process.env.REACT_APP_BASE_URL}/listing/` + id, body
  );
}

export function deleteListings(data) {
  return axios.delete(
    `${process.env.REACT_APP_BASE_URL}/listing/` + data.listing_id
  );
}

export function getAllListings() {
  return axios.get( `${process.env.REACT_APP_BASE_URL}/listing/list/:page/:pagesize`, );
}

export const createListing = async ( payload ) => {
  try {
    const response = await api.post(endPoints.createListing(), payload)
    return response
  }
  catch (e) {
    throw new Error( e )
  }
}

export const getListingById = async ( id ) => {
  try {
     const response = await api.get(endPoints.getListingById(id))
     return response?.data?.data
  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const updateListing = async (id, payload ) => {
  try {
    const response = await api.put(endPoints.getListingById(id), payload)
    return response?.data?.data
 }
 catch ( e ) {
   throw new Error( e )
 }
}


export const getAllHouseRules = async () => {
  try {
    const response = await api.get(endPoints.getAllHouseRules())
  
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllAmenities = async () => {
  try {
    const response = await api.get(endPoints.getAllAmenities())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllAmenitiesGroup = async () => {
  try {
    const response = await api.get(endPoints.getAllAmenitiesGroup())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllAmenitiesGroupQuery = async () => {
  try {
    const response = await api.get(endPoints.getAllAmenitiesGroupQuery())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllCategories = async () => {
  try {
    const response = await api.get(endPoints.getAllCategories())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getALLCountries = async () => {
  try {
    const response = await api.get(endPoints.getALLCountries())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllDestinations = async () => {
  try {
    const response = await api.get(endPoints.getAllDestinations())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllRegions = async () => {
  try {
    const response = await api.get(endPoints.getAllRegions())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllExtraServices = async () => {
  try {
    const response = await api.get(endPoints.getAllExtraServices())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllListingTypes = async () => {
  try {
    const response = await api.get(endPoints.getAllListingTypes())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}


export const getAllOffers = async () => {
  try {
    const response = await api.get(endPoints.getAllOffers())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllPets = async () => {
  try {
    const response = await api.get(endPoints.getAllPets())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllPropertyTypes = async () => {
  try {
    const response = await api.get(endPoints.getAllPropertyTypes())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllProcessingFee = async () => {
  try {
    const response = await api.get(endPoints.getAllProcessingFee())
    return response.data.data
  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const uploadMultipleImages = async () => {
  try {
    const response = await api.get(endPoints.uploadMultipleImages())
    return response.data.data

  }
  catch ( e ) {
    throw new Error( e )
  }
}

export const getAllAddons = async () => {
 try {
  const response = await api.get(endPoints.getAllAddons());
  return response.data.data 
  
 }
 catch (e) {
  throw new Error( e )
 }
}


export const getListingTypes = async () => {
  try {
   const response = await api.get(endPoints.getAllListingTypes());
   return response.data.data
  }
  catch ( e ) {
    throw new Error( e )
  }
}
