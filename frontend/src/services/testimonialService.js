import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const getPublicTestimonials = () => axios.get(`${API_BASE}/testimonials/public`);
export const getPartners = () => axios.get(`${API_BASE}/partners`, { params: { isActive: true, limit: 20 } });