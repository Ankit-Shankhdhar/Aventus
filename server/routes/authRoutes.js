import express from 'express';
import {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/authController.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { authValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/signup', authValidation.signup, validate, signup);
router.post('/login', authValidation.login, validate, login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

// Admin routes
router.get('/users', auth, adminAuth, getAllUsers);
router.put('/users/role', auth, adminAuth, updateUserRole);
router.delete('/users/:userId', auth, adminAuth, deleteUser);

export default router;
