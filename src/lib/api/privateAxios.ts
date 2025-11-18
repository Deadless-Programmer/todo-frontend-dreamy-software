import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "../constants";
import { getAccessToken } from "@/utils/token";

export const privateAxios = axios.create({
  baseURL: API_BASE,
});


privateAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
