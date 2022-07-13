import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import errorHandler from './services/errorsHandler';
import AppError from './utils/errors/appError';
import authRoutes from './api/routes/authentication';
import userRoutes from './api/routes/user';
import studentInfoRoutes from './api/routes/students';
import dashboardRoutes from './api/routes/dashboard';

const cwd = process.cwd();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  process.exit(1);
});

dotenv.config();

// Initialize express
const app: express.Application = express();

// enable proxy
app.enable('trust proxy');

// Port
const address = '0.0.0.0:8000';
const PORT = process.env.PORT || 8000;

// compression middleware
app.use(compression());

// implement cors
// use cors middleware
app.use(cors());

// add your routes
// app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(cwd, 'temp'),
    createParentPath: true,
  })
);

// Define index route
app.get('/', async (req: Request, res: Response) => {
  res.send(
    "<section style=background:#104DB2;padding:6em;color:white;font-size:20px;><center><h2>Welcome To Prolego!</h2>A platform that takes into consideration the academic excellence of students. We’re so glad you’re here! You are now part of a growing community of professionals contributing to the reduction of academic dropout and failure by predicting student's academic performance across the globe via Prolego Whether you’ve come to create something of your own or for your company, we’ve got something for you. Let’s go!.</center><p style=font-size:22px;><a href='https://documenter.getpostman.com/view/11215567/UzBmM7GL#0ed2871f-3d6c-47c4-8a9f-2fba0e10a374'style=color:white;font-size:22px;>Click here<a/> for Documentation</p></section>"
  );
});

// app.get('/upload', async (req: Request, res: Response) => {
//   res.render('index');
// });

// Routes

authRoutes(app);
userRoutes(app);
studentInfoRoutes(app);
dashboardRoutes(app);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`can't find ${req.originalUrl} on server!`, 404));
});

app.use(errorHandler);

// Listen for server connections
const server = app.listen(PORT, () =>
  console.log(`server running on ${address}`)
);

process.on('unhandledRejection', (err: any) => {
  throw err;
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. shutting down gracefully');
  server.close(() => {
    console.log('process terminated!');
  });
});

export default server;
