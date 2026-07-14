import api from "./api";

export const verifyCertificate = (certId) => api.get(`/certificates/verify/${certId}`);
export const createCertificate = (data) => api.post("/certificates", data);
export const getAllCertificates = () => api.get("/certificates");
