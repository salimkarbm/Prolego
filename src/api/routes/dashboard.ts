import express from 'express';

import {
  predictStudentById,
  attendance,
  predict,
} from '../controllers/dashboard';

const dashboard = (app: express.Application) => {
  app.patch('/api/v1/predict', predict);
  app.post('/api/v1/predict/:id', predictStudentById);
  app.get('/api/v1/attendance', attendance);
};

export default dashboard;
