import express from 'express';
import getUserById from '../controllers/users';
import verifyUser from '../../middlewares/authentication';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users/:id', verifyUser, getUserById);
};

export default userRoutes;
