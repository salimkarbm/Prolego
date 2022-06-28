"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const students_1 = require("../controllers/students");
const studentInfoRoutes = (app) => {
    app.post('/api/v1/students', students_1.saveDataToDB);
    app.get('/api/v1/students', students_1.index);
};
exports.default = studentInfoRoutes;
