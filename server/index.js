import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import productRoutes from './routes/productRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import sponsorRoutes from './routes/sponsorRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
// app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' || 'http://localhost:8080' || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nexus Ventus Forge API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/products', productRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/emails', emailRoutes);

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'Nexus Ventus Forge API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      teams: '/api/teams',
      news: '/api/news',
      jobs: '/api/jobs',
      products: '/api/products',
      players: '/api/players',
      matches: '/api/matches',
      sponsors: '/api/sponsors',
      management: '/api/management',
      emails: '/api/emails'
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

export default app;
