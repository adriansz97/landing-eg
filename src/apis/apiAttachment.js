import { apiCall } from ".";
import { getTenant } from "../handlers/getTenant";

export const createAttachment = async (files) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.post(`${tenant}/api/attachment/`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};