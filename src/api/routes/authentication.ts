import express from 'express';
import { check } from 'express-validator';
import { create, authenticate } from '../controllers/authentication';
import verifyUser from '../../middlewares/authentication';

const authRoutes = (app: express.Application) => {
  app.post(
    '/api/v1/signup',
    [
      check('firstname', 'First Name is required')
        .trim()
        .escape()
        .notEmpty()
        .isString(),
      check('lastname', 'Last Name is required')
        .trim()
        .escape()
        .notEmpty()
        .isString(),
      check('email').isEmail().trim().escape().normalizeEmail().notEmpty(),
      check('password').isLength({ min: 8 }).trim().escape().notEmpty(),
    ],
    create
  );
  app.post(
    '/api/v1/login',
    [
      check('email').isEmail().trim().escape().normalizeEmail().not().isEmpty(),
      check('password').isLength({ min: 8 }).trim().escape().notEmpty(),
    ],
    authenticate,
    verifyUser
  );
};

export default authRoutes;
