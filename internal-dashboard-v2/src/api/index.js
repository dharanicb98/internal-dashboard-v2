import axios from "axios";



const axiosParameters = {
    baseURL: process.env.REACT_APP_BASE_URL
}

const axiosInstance = axios.create( axiosParameters )

const api = ( axios ) => {
   return {
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    put: (url, body, config) => axios.put(url, body, config),
    delete: (url, config) => axios.delete(url, config)
   }
}


api(axiosInstance)

export default axiosInstance