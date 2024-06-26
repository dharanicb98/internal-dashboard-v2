import Axios, { getConfigToken } from "utils/axios";
import endPoints from "./endpoints";
import axios from "axios";

export const getFileType = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return "image";
  } 
  else if (fileType.startsWith("video/")) {
    return "video";
  }
  return "document";
};

export const fileUpload = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("image", data);
    // const res = await axios.post<FileUploadResponse>(`${process.env.NEXT_PUBLIC_FILE_UPLOAD}/upload`,formData, {headers: { "Content-Type": "multipart/form-data",}});
    const res = await Axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v2/upload/image/public`, formData, {headers: { "Content-Type": "multipart/form-data",}})
    // const res = await axios.post('https://rentmyhotel.com/api/v2/upload/image/public', formData, {headers: { "Content-Type": "multipart/form-data",}})
    return { url: res.data, err: false};
  }
   catch (e) {
    console.log(e);
    return {
      url: "",
      err: true,
    };
  }
};

export const getAllUploadData = async () => {
  try {
    const response = await Axios.post(endPoints.getAllPublicImages())
    return response.data
  }
  catch ( e ) {
    throw new Error( e )
  }
}

type FileUploadResponse = {
  image: string;
};
