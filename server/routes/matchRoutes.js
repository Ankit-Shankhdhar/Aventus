import express from 'express';
import {
  getAllMatches,
  getMatchBySlug,
  createMatch,
  updateMatch,
  deleteMatch,
  getUpcomingMatches
} from '../controllers/matchController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/:slug', getMatchBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, createMatch);
router.put('/:slug', auth, moderatorAuth, updateMatch);
router.delete('/:slug', auth, moderatorAuth, deleteMatch);

export default router;
