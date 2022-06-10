import express from 'express';
import getUserById from '../controllers/users';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users/:id', getUserById);
};

export default userRoutes;
