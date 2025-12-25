import express from 'express';
import {
  getAllPlayers,
  getPlayerBySlug,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/playerController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPlayers);
router.get('/:slug', getPlayerBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, createPlayer);
router.put('/:slug', auth, moderatorAuth, updatePlayer);
router.delete('/:slug', auth, moderatorAuth, deletePlayer);

export default router;
