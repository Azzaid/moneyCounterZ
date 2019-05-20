import axios from 'axios';

import { BASE_URL } from '../constants/httpProtocol.js'

const http = axios.create({
  baseURL: BASE_URL
});

http.interceptors.request.use(cfg => {
  console.log(cfg);
  return cfg;
});

export default http;

export const simulationDataAPI = userId => `/simulationData/${userId}`;