import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const getGallery = (params = {}) => axios.get(`${API_BASE}/gallery`, { params });
export const getGalleryItem = (id) => axios.get(`${API_BASE}/gallery/${id}`);