// backend/controllers/ai.controller.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// ✅ Ensure you’re using the correct endpoint version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    console.log("🧠 Prompt received:", prompt);

    // ✅ Use the correct v1 model path
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      apiVersion: "v1", // 🔥 forces v1 instead of v1beta
    });

    const result = await model.generateContent(prompt);
    const aiResponse = result?.response?.text?.() || "⚠️ No AI response received.";

    console.log("✨ AI Response:", aiResponse);
    res.status(200).json({ text: aiResponse });
  } catch (error) {
    console.error("❌ Error with Gemini API:", error);
    res.status(500).json({
      error: "Failed to connect to Gemini API.",
      details: error.message,
    });
  }
};
