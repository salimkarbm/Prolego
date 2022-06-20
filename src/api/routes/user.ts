import express from 'express';
import { getUserById, index, forgotPasswordMail } from '../controllers/users';
import verifyUser from '../../middlewares/authentication';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users', index);
  app.get('/api/v1/users/:id', verifyUser, getUserById);
  app.post('/api/v1/users/forgotpassword', forgotPasswordMail);
};

export default userRoutes;
