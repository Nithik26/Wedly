// In backend/routes/auth.routes.js
import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// This is the line that was missing
export default router;