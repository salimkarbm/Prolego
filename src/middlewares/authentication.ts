import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserStore from '../models/user';
import { jwtToken } from '../utils/interface/user';
import { secret } from '../utils/jwtCredentials';

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
      return res
        .status(401)
        .json({ error: 'You are not logged in! please login to gain access.' });
    }
    const decoded = jwt.verify(token, secret) as jwtToken;
    const currentUser = await store.getUserById(decoded.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: 'The user belonging to this token no longer exist' });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'invalid token' });
  }
};

export default verifyAuthToken;
