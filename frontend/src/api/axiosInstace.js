import axios from "axios";

const baseURL = import.meta.url.VITE_SERVER_BASE_URL;

const apiInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiInstance;
