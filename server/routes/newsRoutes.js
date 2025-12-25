import express from 'express';
import {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  getFeaturedNews,
  getNewsCategories
} from '../controllers/newsController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';
import { newsValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/featured', getFeaturedNews);
router.get('/categories', getNewsCategories);
router.get('/:slug', getNewsBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, newsValidation.create, validate, createNews);
router.put('/:slug', auth, moderatorAuth, updateNews);
router.delete('/:slug', auth, moderatorAuth, deleteNews);

export default router;
