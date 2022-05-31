import express from 'express';
import { check } from 'express-validator';
import create from '../controllers/authentication';

const authRoutes = (app: express.Application) => {
  app.post(
    '/api/v1/signup',
    [
      check('firstname', 'First Name is required')
        .trim()
        .escape()
        .not()
        .isEmpty(),
      check('lastname', 'Last Name is required')
        .trim()
        .escape()
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail()
        .not()
        .isEmpty(),
      check('password', 'Password is required')
        .isLength({ min: 5 })
        .trim()
        .escape()
        .not()
        .isEmpty(),
    ],
    create
  );
};

export default authRoutes;
