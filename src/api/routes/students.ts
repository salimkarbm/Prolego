import express from 'express';

import { saveDataToDB, index } from '../controllers/students';

const studentInfoRoutes = (app: express.Application) => {
  app.post('/api/v1/students', saveDataToDB);
  app.get('/api/v1/students', index);
};

export default studentInfoRoutes;
