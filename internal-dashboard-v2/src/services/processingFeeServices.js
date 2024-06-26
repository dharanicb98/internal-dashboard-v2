import axios from 'axios';

export function getProcessingFee(){
    return axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/processing-fee`);
}

export function deleteProcessingFee(id){
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/attributes/list/processing-fee/`+ id);
}

export function editProcessingFee(formData){
    return axios.put(`${process.env.REACT_APP_BASE_URL}/attributes/list/processing-fee`, formData);
}

const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export function postProcessingFee(formData){
    return axios.post(`${process.env.REACT_APP_BASE_URL}/attributes/list/processing-fee`,formData,config);
}
