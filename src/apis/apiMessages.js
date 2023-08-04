import { apiCall } from ".";
import { getTenant } from "../handlers/getTenant";

// PUBLIC PANELS ///
// ANONYMOUS
export const getAnonymousPanel = async (tracking_code) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.get(`${tenant}/api/report/${tracking_code}/public-messages/`)
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
export const createAnonymousMessage = async ({ tracking_code, content = "... una más" }) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.post(`${tenant}/api/report/${tracking_code}/public-messages/`, { content })
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};