import api from "./api";

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password }).then(r => r.data);

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then(r => r.data);

export const getMe = () =>
  api.get("/auth/me").then(r => r.data);