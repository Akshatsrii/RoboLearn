import axios from "axios";

const API_BASE = "https://robolearn-1.onrender.com/api";

export const adminApi = axios.create({ baseURL: API_BASE });

// Always read token fresh from localStorage on every request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401 — clear token and redirect to unified login
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
