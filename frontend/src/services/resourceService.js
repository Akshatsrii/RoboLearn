import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const getResources = () => axios.get(`${API_BASE}/resources`);