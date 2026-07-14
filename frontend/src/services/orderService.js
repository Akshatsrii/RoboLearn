import api from "./api";

export const trackOrder = (orderId) => api.get(`/payment/track-order/${orderId}`);
export const getUserOrders = (userId) => api.get(`/payment/user-orders/${userId}`);
