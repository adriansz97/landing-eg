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

