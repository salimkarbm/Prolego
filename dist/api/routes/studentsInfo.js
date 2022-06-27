"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentsInfo_1 = __importDefault(require("../controllers/studentsInfo"));
const studentInfoRoutes = (app) => {
    app.get('/api/v1/studentsInfo', studentsInfo_1.default);
};
exports.default = studentInfoRoutes;
