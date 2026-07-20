import axios from "axios";

const API_BASE = "https://robolearn-cev6.onrender.com/api";

export const getCourses = (params = {}) => axios.get(`${API_BASE}/courses`, { params });
export const proposeCourse = (data) => axios.post(`${API_BASE}/courses/propose`, data);
