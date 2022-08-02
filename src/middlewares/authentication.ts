import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserStore from '../models/user';
import { jwtToken } from '../utils/interface/user';
import { secret } from '../utils/jwtCredentials';
import AppError from '../utils/errors/appError';

const store = new UserStore();

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('The user belonging to this token no longer exist', 401)
      );
    }
    const decoded = jwt.verify(token, secret) as jwtToken;
    if (!decoded) {
      return next(new AppError('invalid token', 401));
    }
    const currentUser = await store.getUserById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('You are not logged in! please login to gain access.', 401)
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyAuthToken;
