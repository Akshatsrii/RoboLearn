import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const getCourses = (params = {}) => axios.get(`${API_BASE}/courses`, { params });