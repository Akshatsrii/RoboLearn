import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

// Used for admin CRUD calls (Products, Blogs, Gallery, Courses, Leads).
// Auth itself (login/logout/session) is handled by the unified AuthContext —
// this just reads the same token that AuthContext stores, under the "token" key.
export const adminApi = axios.create({ baseURL: API_BASE });

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 (expired/invalid token) — send back to the unified login page.
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