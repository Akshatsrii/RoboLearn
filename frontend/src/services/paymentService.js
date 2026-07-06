import api from "./api";

export const createPaymentIntent = (data) => api.post("/payment/create-payment-intent", data);
