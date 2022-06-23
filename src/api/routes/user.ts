import express from 'express';
import { check } from 'express-validator';
import { getUserById, index, getUserByEmail } from '../controllers/users';
import verifyUser from '../../middlewares/authentication';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users', index);
  app.get('/api/v1/users/:id', verifyUser, getUserById);
  app.get(
    '/api/v1/users-email',
    check('email')
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail()
      .notEmpty()
      .isString(),
    getUserByEmail
  );
};

export default userRoutes;
