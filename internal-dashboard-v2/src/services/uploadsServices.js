import axios from "axios"


export const uploadSingleImages = ( formData ) => {
    return axios.post('https://rentmyhotel.com/api/v2/upload/image/public/multi', formData, {headers:{"Content-Type": "multipart/form-data"}} )
}