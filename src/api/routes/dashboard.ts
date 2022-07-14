import express from 'express';

import {
  predictionSummary,
  predictStudentById,
  attendance,
  predict,
  top5students,
  top5studentsbycourse,
  courses,
} from '../controllers/dashboard';

const dashboard = (app: express.Application) => {
  app.patch('/api/v1/predict', predict);
  app.post('/api/v1/predict/:id', predictStudentById);
  app.get('/api/v1/attendance', attendance);
  app.get('/api/v1/courses', courses);
  app.get('/api/v1/predictionsummary', predictionSummary);
  app.get('/api/v1/top5students', top5students);
  app.get('/api/v1/top5studentsbycourse', top5studentsbycourse);
};

export default dashboard;
