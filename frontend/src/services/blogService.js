import api from "./api";

export const getBlogs = (params) => api.get("/blogs", { params });
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);