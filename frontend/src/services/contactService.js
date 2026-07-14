import axios from "axios";

/**
 * Submit contact form directly via Web3Forms API.
 * No backend needed — email goes straight to inbox.
 * Key: VITE_WEB3FORMS_ACCESS_KEY in frontend .env
 */
export const submitContact = async (data) => {
  const payload = {
    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
    subject: `[RoboLearn] New ${data.type || "General"} Inquiry from ${data.name}`,
    from_name: "RoboLearn Contact Form",
    name: data.name,
    email: data.email,
    phone: data.phone || "Not provided",
    school: data.schoolName || "Not provided",
    city: data.city || "Not provided",
    inquiry_type: data.type || "general",
    message: data.message,
    botcheck: "", // honeypot — must be empty
  };

  const res = await axios.post("https://api.web3forms.com/submit", payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.data.success) {
    throw new Error(res.data.message || "Web3Forms submission failed");
  }

  return res.data;
};