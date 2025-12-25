import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const authValidation = {
  signup: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]
};

export const teamValidation = {
  create: [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('name').trim().notEmpty().withMessage('Team name is required'),
    body('game').trim().notEmpty().withMessage('Game is required'),
    body('gameCategory').trim().notEmpty().withMessage('Game category is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ]
};

export const newsValidation = {
  create: [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ]
};

export const jobValidation = {
  create: [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('type').isIn(['staff', 'player', 'creator', 'freelance']).withMessage('Invalid type'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ]
};

export const productValidation = {
  create: [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
  ]
};
