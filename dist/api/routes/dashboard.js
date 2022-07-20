"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const dashboard = (app) => {
    app.patch('/api/v1/predict', dashboard_1.predict);
    app.post('/api/v1/predict/:id', dashboard_1.predictStudentById);
    app.get('/api/v1/attendance', dashboard_1.attendance);
    app.get('/api/v1/courses', dashboard_1.courses);
    app.get('/api/v1/predictionsummary', dashboard_1.predictionSummary);
    app.get('/api/v1/top5students', dashboard_1.top5students);
    app.get('/api/v1/top5studentsbycourse', dashboard_1.top5studentsbycourse);
};
exports.default = dashboard;
