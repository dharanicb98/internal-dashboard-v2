import api from '../api'
import endPoints from "./endPoints";

export const uploadSingleImage = async ( payload ) => {
  try {
    let imageFormData  = new FormData();
    imageFormData.append( "image", payload );
    const response = await api.post( endPoints.uploadSingleImage(), imageFormData, {headers: {'Content-Type':'multipart/form-data'}} );
    return response
  }
  catch (e) {
    throw new Error(e)
  }
}

export const uploadMultipleImages = async ( payload ) => {
  try {
   let imageFormData = new FormData();
   imageFormData.append('image', payload);
   const response = await api.post(endPoints.uploadMultipleImages(), imageFormData, {headers: {'Content-Type':'multipart/form-data'}})
   return response
  }
  catch ( e ) {
    throw new Error(e)
  }
}