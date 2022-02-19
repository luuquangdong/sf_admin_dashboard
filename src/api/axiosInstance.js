import axios from "axios";
export const BASE_URL = "http://localhost:8080";

const headers = {};

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
