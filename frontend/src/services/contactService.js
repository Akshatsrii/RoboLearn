import api from "./api";

export const submitContact = (data) => api.post("/contact", data);
export const getContacts = (params) => api.get("/contact", { params });
export const updateContactStatus = (id, data) => api.patch(`/contact/${id}/status`, data);