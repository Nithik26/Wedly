import express from 'express';
import { getItinerary, updateItinerary, deleteEvent } from '../controllers/itinerary.controller.js';
import { requireSession } from '../middleware/session.middleware.js';

const router = express.Router();

// Get user's itinerary
router.get('/', requireSession, getItinerary);

// Create or update itinerary
router.post('/', requireSession, updateItinerary);

// Delete an event from itinerary
router.delete('/event/:eventId', requireSession, deleteEvent);

export default router;