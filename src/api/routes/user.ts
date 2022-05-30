import express from 'express';
import getAllUser from '../controllers/user';

const userRoutes = (app: express.Application) => {
  app.get('/api/v1/users', getAllUser);
};

export default userRoutes;
