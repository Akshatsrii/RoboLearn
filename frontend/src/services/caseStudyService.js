import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const getCaseStudies = () => axios.get(`${API_BASE}/case-studies`);
export const getCaseStudy = (id) => axios.get(`${API_BASE}/case-studies/${id}`);