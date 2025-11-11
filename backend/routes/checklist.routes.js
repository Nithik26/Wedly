import express from "express";
import {
  getChecklist,
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
} from "../controllers/checklist.controller.js";
import { requireSession } from '../middleware/session.middleware.js';

const router = express.Router();

router.get("/", requireSession, getChecklist);
router.post("/", requireSession, addChecklistItem);
router.patch("/:id", requireSession, toggleChecklistItem);
router.delete("/:id", requireSession, deleteChecklistItem);

export default router;
