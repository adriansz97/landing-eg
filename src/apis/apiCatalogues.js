import { apiCall } from ".";
import { getTenant } from "../handlers/getTenant";

// LIST CATALOGUE ENDPOINT 
export const listCatalogues = async () => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.get(`${tenant}/api/list/catalogues/`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};


// LIST RETRIEVE CATALOGUE ENDPOINT
export const listRelativeCatalogues = async ( data = {} ) => {
  const tenant = getTenant();
  try {
    const resp = await apiCall.post(`${tenant}/api/list/catalogues/`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//OWN CATALOGUES 

//LIST OWN CATALOGUES ENDPOINT
export const ownCatalogues = async () => { 
  const tenant = getTenant();
  try{
    const resp = await apiCall.get(`${tenant}/api/list/own-catalogues/`);
    return resp.data;
  }catch (error) {
    console.log("error",error)
  }
};

// DETAILS OWN CATALOGUE ENDPOINT 
export const detailCatalogue = async (data = {alias:""}) => { 
  const tenant = getTenant();
  try { 
    const resp = await apiCall.post(`${tenant}/api/detail/own-catalogue/`, data);
    return resp.data;
  } catch (error) {  
    console.log(error)
  }
}

export const catalogByPart = async (data = { is_own: false, catalogue: "", path: "" }) => {
  const tenant = getTenant();
  try{
    const resp = await apiCall.post(`${tenant}/api/detail/catalogue/`, data);
    return resp.data;
  } catch(error){
    console.log({error})
  }
};