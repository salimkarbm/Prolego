import express from 'express';

import { saveDataToDB, index, show } from '../controllers/students';

const studentInfoRoutes = (app: express.Application) => {
  app.post('/api/v1/students', saveDataToDB);
  app.get('/api/v1/students', index);
  app.get('/api/v1/students/:field', show);
};

export default studentInfoRoutes;
