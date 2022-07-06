import express from 'express';

import {
  upload,
  index,
  show,
  studentByCategory,
} from '../controllers/students';

const studentInfoRoutes = (app: express.Application) => {
  app.post('/api/v1/upload', upload);
  app.get('/api/v1/students', index);
  app.get('/api/v1/students/:id', show);
  app.get('/api/v1/studentscategory', studentByCategory);
};

export default studentInfoRoutes;
