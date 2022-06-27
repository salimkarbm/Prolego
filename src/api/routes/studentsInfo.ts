import express from 'express';

import saveDataToDB from '../controllers/studentsInfo';

const studentInfoRoutes = (app: express.Application) => {
  app.get('/api/v1/studentsInfo', saveDataToDB);
};

export default studentInfoRoutes;
