// backend/routes/weddingdetails.routes.js
import express from "express";
import { getWeddingDetails, saveWeddingDetails } from "../controllers/weddingdetails.controller.js";
import { requireSession } from '../middleware/session.middleware.js';

const router = express.Router();

router.get("/", requireSession, getWeddingDetails);
router.post("/", requireSession, saveWeddingDetails);

export default router;
