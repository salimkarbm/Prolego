import express from 'express';

import {
  predictionSummary,
  predictStudentById,
  attendance,
  predict,
} from '../controllers/dashboard';

const dashboard = (app: express.Application) => {
  app.patch('/api/v1/predict', predict);
  app.post('/api/v1/predict/:id', predictStudentById);
  app.get('/api/v1/attendance', attendance);
  app.get('/api/v1/predictionsummary', predictionSummary);
};

export default dashboard;
