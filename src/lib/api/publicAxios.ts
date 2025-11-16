import axios from "axios";
import { API_BASE } from "../constants";

export const publicAxios = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
