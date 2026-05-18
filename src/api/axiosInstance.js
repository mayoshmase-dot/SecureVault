import axios from "axios";
import i18n from "../i18next";

const axiosInstance = axios.create({
  baseURL: "https://backend-project-nwve.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Accept-Language"] = i18n.language;

  return config;
});

export default axiosInstance;