"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const students_1 = require("../controllers/students");
const studentInfoRoutes = (app) => {
    app.post('/api/v1/upload', students_1.upload);
    app.get('/api/v1/students', students_1.index);
    app.get('/api/v1/students/:id', students_1.show);
    app.get('/api/v1/studentscategory', students_1.studentByCategory);
};
exports.default = studentInfoRoutes;
