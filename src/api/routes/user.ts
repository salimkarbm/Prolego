import express from 'express';
import { getUserById, index } from '../../../users';
import verifyUser from '../../middlewares/authentication';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users', index);
  app.get('/api/v1/users/:id', verifyUser, getUserById);
};

export default userRoutes;
