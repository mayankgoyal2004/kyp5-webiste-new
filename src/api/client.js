import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7777/api/";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

apiClient.interceptors.request.use(
  (config) => {
    const studentToken = localStorage.getItem("studentToken");
    if (studentToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${studentToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // Return standard payload if wrapped in ApiResponse
    if (response.data && response.data.data !== undefined) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
