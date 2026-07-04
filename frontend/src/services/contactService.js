import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const submitContact = (data) => axios.post(`${API_BASE}/contact/submit`, data);