import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are RoboLearn Assistant.

About RoboLearn:
- Rajasthan based Robotics & STEM education company.
- Robotics Lab Setup.
- Arduino, IoT, AI, PCB Design Training.
- Teacher Training.
- CBSE & NEP 2020 Curriculum.
- Robotics Kits.
- Contact: info@robolearn.in

If the user asks anything about RoboLearn, answer using the above information.

If they ask general questions, answer normally.

Keep answers short and friendly.
`;

export async function sendChatMessage(history) {
  try {
    const conversation = [
      {
        role: "user",
        parts: [
          {
            text: SYSTEM_PROMPT,
          },
        ],
      },
      ...history.map((msg) => ({
        role: msg.role === "bot" ? "model" : "user",
        parts: [
          {
            text: msg.text,
          },
        ],
      })),
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Sorry, I couldn't generate a response.";
  }
}