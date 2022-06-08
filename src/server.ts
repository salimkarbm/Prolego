import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import errorHandler from './services/errorsHandler';
import AppError from './utils/errors/appError';
import userRouters from './api/routes/user';
import authRoutes from './api/routes/authentication';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  process.exit(1);
});

dotenv.config();

// Initialize express
const app: express.Application = express();

// Port
const address = '0.0.0.0:8000';
const PORT = process.env.PORT || 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define index route
app.get('/', async (req: Request, res: Response) => {
  res.send(
    "<h3>Welcome To Prolego. Your World Of High-Performance Awaits, We’re so glad you’re here! You are now part of a growing community of professionals contributing to the reduction of academic dropout and failure by predicting student's academic performance across the globe via Prolego Whether you’ve come to create something of your own or for your company, we’ve got something for you. Let’s go!.</h3>"
  );
});
// users routes
userRouters(app);
authRoutes(app);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`can't find ${req.originalUrl} on server!`, 404));
});

app.use(errorHandler);

// Listen for server connections
app.listen(PORT, () => console.log(`server running on ${address}`));

process.on('unhandledRejection', (err: any) => {
  throw err;
});

export default app;
