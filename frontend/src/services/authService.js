import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const authApi = axios.create({ baseURL: API_BASE });

// Attach token to every request automatically
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginRequest = (email, password) => authApi.post("/auth/login", { email, password });
export const registerRequest = (name, email, password) => authApi.post("/auth/register", { name, email, password });
export const getMeRequest = () => authApi.get("/auth/me");