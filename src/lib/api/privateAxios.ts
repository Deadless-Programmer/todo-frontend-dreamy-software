import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "../constants";
import { getAccessToken } from "@/utils/token";

export const privateAxios = axios.create({
  baseURL: API_BASE,
});

// Request interceptor
privateAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
