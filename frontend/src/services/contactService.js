import axios from "axios";
import api from "./api";

/**
 * Submit contact form:
 * 1. Save to our backend DB (so admin can see leads)
 * 2. Also email via Web3Forms if key is configured
 */
export const submitContact = async (data) => {
  // 1. Save to backend
  const backendRes = await api.post("/contact", data);

  // 2. Also send via Web3Forms (email notification) if key is set
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (accessKey) {
    try {
      const payload = {
        access_key: accessKey,
        subject: `[RoboLearn] New ${data.type || "General"} Inquiry from ${data.name}`,
        from_name: "RoboLearn Contact Form",
        name: data.name,
        email: data.email,
        phone: data.phone || "Not provided",
        school: data.schoolName || "Not provided",
        city: data.city || "Not provided",
        inquiry_type: data.type || "general",
        message: data.message,
        botcheck: "",
      };
      await axios.post("https://api.web3forms.com/submit", payload, {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Email send failed but lead is saved, no problem
    }
  }

  return backendRes.data;
};