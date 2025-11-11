import express from 'express';
import { getAllData, deleteDocument } from '../controllers/admin.controller.js';

const router = express.Router();

// Get all data from all collections
router.get('/all-data', getAllData);

// Delete a document from any collection
router.delete('/:collection/:id', deleteDocument);

export default router;
