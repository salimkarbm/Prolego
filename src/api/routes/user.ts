import express from 'express';
import deleteUser from '../controller/user';

const userRouters = (app: express.Application) => {
  app.delete('/api/v1/users/:id', deleteUser);
};

export default userRouters;
