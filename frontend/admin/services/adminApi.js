import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const adminApi = axios.create({ baseURL: API_BASE });

// Attach the stored JWT to every admin request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 (expired/invalid token)
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export const login = (email, password) => adminApi.post("/auth/login", { email, password });
export const getMe = () => adminApi.get("/auth/me");