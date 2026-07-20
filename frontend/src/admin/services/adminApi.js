import axios from "axios";

const API_BASE = "https://robolearn-cev6.onrender.com/api";

export const adminApi = axios.create({ baseURL: API_BASE });

// Attach the stored JWT to every admin request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 (expired/invalid token)
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const login = (email, password) => adminApi.post("/auth/login", { email, password });
export const getMe = () => adminApi.get("/auth/me");
