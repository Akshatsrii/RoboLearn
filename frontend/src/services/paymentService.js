import api from "./api";

export const createPaymentIntent = (data) => api.post("/payment/create-payment-intent", data);
export const createRazorpayOrder = (data) => api.post("/payment/create-razorpay-order", data);
export const verifyRazorpayPayment = (data) => api.post("/payment/verify-razorpay-payment", data);
export const saveOrder = (orderData) => api.post("/payment/save-order", orderData);
