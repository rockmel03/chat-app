import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const apiInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiInstance;
