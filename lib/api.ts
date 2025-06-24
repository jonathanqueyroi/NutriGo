import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.27:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default api;
