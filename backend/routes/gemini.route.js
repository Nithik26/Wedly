import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Quick sanity check
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing from .env");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/gemini
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required." });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() ?? "";

    return res.json({ response: text });
  } catch (err) {
    console.error("Gemini API Error:", err?.response?.data || err?.message || err);
    return res.status(500).json({ error: "Failed to fetch response from Gemini." });
  }
});

export default router;
