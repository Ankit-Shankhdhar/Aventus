import express from 'express';
import {
  getAllTeams,
  getTeamBySlug,
  createTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam
} from '../controllers/teamController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';
import { teamValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeams);
router.get('/:slug', getTeamBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, teamValidation.create, validate, createTeam);
router.put('/:slug', auth, moderatorAuth, updateTeam);
router.delete('/:slug', auth, moderatorAuth, deleteTeam);
router.post('/:slug/players', auth, moderatorAuth, addPlayerToTeam);
router.delete('/:slug/players/:playerId', auth, moderatorAuth, removePlayerFromTeam);

export default router;
