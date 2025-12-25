import express from 'express';
import { sendContactEmail, sendApplicationEmail } from '../controllers/emailController.js';

const router = express.Router();

// @route   POST /api/emails/contact
// @desc    Send contact form email
// @access  Public
router.post('/contact', sendContactEmail);

// @route   POST /api/emails/application
// @desc    Send application email
// @access  Public
router.post('/application', sendApplicationEmail);

export default router;
