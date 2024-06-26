import axios from "axios";

const apiURL_V3 = process.env.NEXT_PUBLIC_SNIZLE_HKJSON_API + "/api/v2";

const config = {
  headers: {
    "X-CSCAPI-KEY": "QWVnTTB5SGpzOW1DV3kzdkVLUzNZY2k4dmdaaEY5UVJOb3RQSVFRZg==",
  },
};

const config1 = {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpudWxsLCJzZXNzaW9uX3Rva2VuIjoiZGZmYTNjYWYtNDI0Ny00MTA3LThlZWItNTJiODUxYzJhMjBhIiwiYXV0aF90eXBlIjoiYW5vbiIsIm5hbWUiOiIiLCJlbWFpbCI6IiIsImlhdCI6MTcwNDg4MzMwNn0.wTxCou9-4Sdv3bch1crEqDFAlGosZBy3XN7lV2LliyU",
  },
};

export const getCountryMobileList = (countryCode) => {
  return axios.get(
    `https://api.countrystatecity.in/v1/countries/${countryCode}`,
    config
  );
};

export const getStateList = (countryCode) => {
  if (countryCode) {
    return axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      config
    );
  } else {
    return [];
  }
};

export const getCityList = (countryCode, stateCode) => {
  if (countryCode && stateCode) {
    return axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      config
    );
  } else {
    console.log("check for city", countryCode, stateCode);
    return [];
  }
};

// get country from json
export const getCountryList = () => {
  return axios.get("https://api.countrystatecity.in/v1/countries", config);
};

export function createOnBoardingHost(body) {
  console.log(
    "check this for api call ",
    process.env.NEXT_PUBLIC_SNIZLE_HKJSON_API
  );
  return axios.post(apiURL_V3 + "/hosts/on-boarding/?code=true", body, config1);
}

export function verifyOnBoardingHost(body) {
  return axios.post(apiURL_V3 + "/hosts/on-boarding/verify-code/", body);
}

export function createDocUSign(body) {
  return axios.post(apiURL_V3 + "/hosts/on-boarding/create-docusign", body);
}

export function submitDocUSign(body) {
  return axios.post(apiURL_V3 + "/hosts/on-boarding/docusign/submit", body);
}

export function getThankYouMessage(id) {
  return axios.get(apiURL_V3 + `/hosts/on-boarding/docusign/${id}`);
}

export function getHostDetail(id) {
  console.log("check api call:" + apiURL_V3 + `/hosts/on-boarding/${id}`);
  return axios.get(apiURL_V3 + `/hosts/on-boarding/${id}`);
}

export function resendOTP(id) {
  return axios.put(apiURL_V3 + `/hosts/on-boarding/reset-otp/${id}`);
}
