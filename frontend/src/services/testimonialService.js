import axios from "axios";

const API_BASE = "https://robolearn-1.onrender.com/api";

export const getPublicTestimonials = () => axios.get(`${API_BASE}/testimonials/public`);
export const getPartners = () => axios.get(`${API_BASE}/partners`, { params: { isActive: true, limit: 20 } });
