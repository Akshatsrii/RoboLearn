const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handle = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const getPublicTestimonials = () =>
  fetch(`${API}/testimonials/public`).then(handle);

export const getPartners = () =>
  fetch(`${API}/partners`).then(handle);