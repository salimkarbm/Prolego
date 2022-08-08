import express from 'express';

import {
  predictionSummary,
  predictStudentById,
  courseAttendance,
  predictAll,
  top5students,
  top5studentsbycourse,
  courseOfStudy,
  upload,
  getAllStudent,
  getStudent,
  studentByCategory,
  search,
} from '../controllers/dashboard';

const dashboard = (app: express.Application) => {
  app.patch('/api/v1/predict', predictAll);
  app.post('/api/v1/predict/:matno', predictStudentById);
  app.get('/api/v1/attendance', courseAttendance);
  app.get('/api/v1/courses', courseOfStudy);
  app.get('/api/v1/predictionsummary', predictionSummary);
  app.get('/api/v1/top5students', top5students);
  app.get('/api/v1/top5studentsbycourse', top5studentsbycourse);
  app.post('/api/v1/upload', upload);
  app.get('/api/v1/students', getAllStudent);
  app.get('/api/v1/students/:matno', getStudent);
  app.get('/api/v1/studentscategory', studentByCategory);
  app.get('/api/v1/search', search);
};

export default dashboard;
