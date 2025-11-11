import express from "express";
import { chatWithAI } from "../controllers/ai.controller.js";

const router = express.Router();

// 🧠 POST /api/ai → handles chat prompts
router.post("/", chatWithAI);

export default router;
