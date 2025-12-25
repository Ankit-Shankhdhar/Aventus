import express from 'express';
import {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  getFeaturedProducts
} from '../controllers/productController.js';
import { auth, moderatorAuth } from '../middleware/auth.js';
import { productValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getProductCategories);
router.get('/:slug', getProductBySlug);

// Protected routes (moderator/admin only)
router.post('/', auth, moderatorAuth, productValidation.create, validate, createProduct);
router.put('/:slug', auth, moderatorAuth, updateProduct);
router.delete('/:slug', auth, moderatorAuth, deleteProduct);

export default router;
