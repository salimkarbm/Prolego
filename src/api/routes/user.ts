import express from 'express';

import forgotemailpassword from '../controllers/user';

const userRouters = (app: express.Application) => {
  app.post('/api/v1/users/:id', forgotpassword);
  // app.put('/api/v1/users/:id', updateUsers);
};

export default userRouters;
