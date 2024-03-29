import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/errors/appError';

const handleDuplicateFieldDB = (err: any) => {
  const message = err.detail;
  return new AppError(message, 400);
};

const handleExpressValidatorError = (err: any) => {
  const errors = err.errors.map((el: any) => {
    const result = Object.values(el);
    return result[2];
  });
  const message = `Invalid input data ${errors.join(', ')}.`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token. please log in again ', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! please log in again', 401);
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPro = (err: any, res: Response) => {
  // operational error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error: don't leak error details'
  } else {
    // log error
    console.error('ERROR', err);
    // send generic error message
    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.errors instanceof Array) {
      error = handleExpressValidatorError(error);
    }
    if (error.code === 23505) {
      error = handleDuplicateFieldDB(error);
    }
    sendErrorPro(error, res);
  }
};
