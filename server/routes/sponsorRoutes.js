import express from 'express';
import {
  getAllSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor
} from '../controllers/sponsorController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllSponsors);
router.get('/:id', getSponsorById);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, createSponsor);
router.put('/:id', auth, moderatorAuth, updateSponsor);
router.delete('/:id', auth, moderatorAuth, deleteSponsor);

export default router;
