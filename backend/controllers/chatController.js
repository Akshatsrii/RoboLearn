const { GoogleGenerativeAI } = require("@google/generative-ai");

// Set GEMINI_API_KEY in your backend .env file — NEVER expose this key to the frontend.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are the RoboLearn Assistant, a helpful chat assistant embedded on the RoboLearn website.

About RoboLearn:
- RoboLearn is a Rajasthan-based robotics and STEM education company for schools across India.
- Services: complete robotics lab setup (hardware + software + safety), student training (beginner to advanced robotics, Arduino, IoT, AI, PCB design), teacher training (teaching methodology, lab management, curriculum integration, assessment), CBSE/NEP-2020-aligned STEM curriculum for Grades 3–12, robotics/AI/IoT kits, and competition preparation.
- Trust signals: 50+ schools, 10,000+ students trained, 20+ trainers, 15+ cities.
- Contact: phone +91 99999 99999, email info@robolearn.in.
`.trim();

async function handleChatMessage(req, res) {
  try {
    const { history } = req.body;

    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({
        error: "history is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const contents = history.map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const result = await model.generateContent({
      contents,
    });

    const reply = result.response.text();

    return res.json({ reply });
  } catch (err) {
    console.error("Gemini chat error:", err);

    return res.status(500).json({
      error: "Failed to get a response from the assistant.",
    });
  }
}

module.exports = {
  handleChatMessage,
};
