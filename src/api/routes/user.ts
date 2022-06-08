import express from 'express';

import updateUsers from '../controllers/user';

const userRouters = (app: express.Application) => {
  app.patch('/api/v1/users/:id', updateUsers);
};

export default userRouters;
