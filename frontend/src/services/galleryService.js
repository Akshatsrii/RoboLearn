import axios from "axios";

const API_BASE = "https://robolearn-cev6.onrender.com/api";

export const getGallery = (params = {}) => axios.get(`${API_BASE}/gallery`, { params });
export const getGalleryItem = (id) => axios.get(`${API_BASE}/gallery/${id}`);
