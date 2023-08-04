import { apiCall } from ".";
import { getTenant } from "../handlers/getTenant";

export const createReport = async (report = {}) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.post(`${tenant}/api/report/create/`, report);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatusReport = async(tracking_code) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.post(`${tenant}/api/report/status/get/`, { tracking_code });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};