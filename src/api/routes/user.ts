import express from 'express';

import updateUsers from '../controller/user';

const userRouters = (app: express.Application) => {
  app.patch('/api/v1/users/:id', updateUsers);
};

export default userRouters;
