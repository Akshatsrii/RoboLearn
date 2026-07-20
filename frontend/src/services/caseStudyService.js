import axios from "axios";

const API_BASE = "https://robolearn-1.onrender.com/api";

export const getCaseStudies = (params = {}) => axios.get(`${API_BASE}/case-studies`, { params });
export const getCaseStudy = (id) => axios.get(`${API_BASE}/case-studies/${id}`);
