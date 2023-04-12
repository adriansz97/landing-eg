import axios from 'axios';
const host = "https://djaguar.herokuapp.com";
// const tenant = "ethicsglobal.com";
const tenant = "sd.lineaetica.com.mx";
const baseURL = `${host}/${tenant}/api`;

const apiCall = axios.create({ baseURL });

export const catalogByPart = async (data = { is_own: false, catalogue: "", path: "" }) => {
  try{
  const resp = await apiCall.post(`/detail/catalogue/`, data);
  return resp.data
  } catch(error){
    console.log("error", error);
  }
};

export const createReport = async ( report = {} ) => {
  try {
    const resp = await apiCall.post(`/report/create/`, report);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailCurrentReport = async () => {
  try {
    const resp = await apiCall.get(`/form/report/`)
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getReportStatus = async (tracking_code) => {
//   try {
//     const resp = await apiCall.post(`/report/status/get/`, { tracking_code })
//     return resp.data;
//   } catch (error) {
//     return {
//       error: true,
//       msg: error.response.data.report
//     }
//   }
// };

// NEW ENDPOINTS FOR CHAT
//{{host}}/{{tenant}}/api/report/TKC-30022wTjJ11/messages/

export const getPublicStatusReport = async (tracking_code) => {
  console.log(`/report/${tracking_code}/status/`)
  try {
    const resp = await apiCall.get(`/report/${tracking_code}/status/`,)
    return resp.data;
  } catch (error) {
    return {
      error: true,
      msg: error.response.data.report
    }
  }
};
export const getPublicMessagesList = async (tracking_code) => {
  try {
    const resp = await apiCall.get(`/report/${tracking_code}/messages/`,)
    return resp.data;
  } catch (error) {
    return {
      error: true,
      msg: error.response.data.report
    }
  }
};
export const createMessagePublic = async (tracking_code, content) => {
  try {
    const resp = await apiCall.post(`/report/${tracking_code}/messages/`, { content })
    return resp.data;
  } catch (error) {
    return {
      error: true,
      msg: error.response.data.report
    }
  }
};


