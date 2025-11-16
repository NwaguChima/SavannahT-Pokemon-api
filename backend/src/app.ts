import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import pokemonRoute from './routes/pokemonRoute';
import favoriteRoute from './routes/favoriteRoute';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parser middleware
app.use(express.json({ limit: '10kb' }));

// Data sanitization middleware
app.use(xss());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting middleware
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Pokémon API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/v1/pokemon', pokemonRoute);
app.use('/api/v1/favorites', favoriteRoute);

// API documentation route
app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Pokémon API',
    version: '1.0.0',
    endpoints: {
      pokemon: {
        getAll: 'GET /api/v1/pokemon',
        getOne: 'GET /api/v1/pokemon/:id',
        search: 'GET /api/v1/pokemon/search/:name',
      },
      favorites: {
        getAll: 'GET /api/v1/favorites',
        add: 'POST /api/v1/favorites',
        remove: 'DELETE /api/v1/favorites/:pokemonId',
      },
    },
  });
});

// Catch-all handler for undefined routes
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
