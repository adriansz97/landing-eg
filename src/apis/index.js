import axios from 'axios';
export * from './apiAttachment';
export * from './apiCatalogues'; 
export * from './apiMessages'; 
export * from './apiForm'; 
export * from './apiReports';

export const host = "https://djaguar.herokuapp.com";
export const baseURL = `${host}`;
export const apiCall = axios.create({ baseURL });
