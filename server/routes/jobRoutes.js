import express from 'express';
import {
  getAllJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  getJobTypes,
  getJobDepartments
} from '../controllers/jobController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';
import { jobValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/types', getJobTypes);
router.get('/departments', getJobDepartments);
router.get('/:slug', getJobBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, jobValidation.create, validate, createJob);
router.put('/:slug', auth, moderatorAuth, updateJob);
router.delete('/:slug', auth, moderatorAuth, deleteJob);

export default router;
