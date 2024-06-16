import axios from "axios";
import { getToken } from "./get-token";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) [(config.headers.Authorization = `Bearer ${token}`)];

  return config;
});

export default axiosClient;
