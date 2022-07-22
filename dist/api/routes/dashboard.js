"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const dashboard = (app) => {
    app.patch('/api/v1/predict', dashboard_1.predictAll);
    app.post('/api/v1/predict/:matno', dashboard_1.predictStudentById);
    app.get('/api/v1/attendance', dashboard_1.attendance);
    app.get('/api/v1/courses', dashboard_1.courses);
    app.get('/api/v1/predictionsummary', dashboard_1.predictionSummary);
    app.get('/api/v1/top5students', dashboard_1.top5students);
    app.get('/api/v1/top5studentsbycourse', dashboard_1.top5studentsbycourse);
    app.post('/api/v1/upload', dashboard_1.upload);
    app.get('/api/v1/students', dashboard_1.getAllStudent);
    app.get('/api/v1/students/:matno', dashboard_1.getStudent);
    app.get('/api/v1/studentscategory', dashboard_1.studentByCategory);
};
exports.default = dashboard;
