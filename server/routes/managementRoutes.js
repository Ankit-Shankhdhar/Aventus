import express from 'express';
import {
  getAllManagement,
  getManagementById,
  createManagement,
  updateManagement,
  deleteManagement
} from '../controllers/managementController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllManagement);
router.get('/:id', getManagementById);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, createManagement);
router.put('/:id', auth, moderatorAuth, updateManagement);
router.delete('/:id', auth, moderatorAuth, deleteManagement);

export default router;
