import { apiCall } from ".";
import { getTenant } from "../handlers/getTenant";

export const renderFormToReport = async () => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.get(`${tenant}/api/render-form-to-report/`)
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

// CURRENT REPORT
export const getDetailCurrentReport = async () => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.get(`${tenant}/api/form/report/`)
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
