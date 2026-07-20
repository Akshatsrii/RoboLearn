import axios from "axios";

const API_BASE = "https://robolearn-cev6.onrender.com/api";

export const getResources = (params = {}) => axios.get(`${API_BASE}/resources`, { params });
