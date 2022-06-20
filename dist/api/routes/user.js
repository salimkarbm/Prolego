"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const userRoutes = (app) => {
    app.get('/api/v1/users', users_1.index);
    app.get('/api/v1/users/:id', authentication_1.default, users_1.getUserById);
    app.post('/api/v1/users/forgotpassword', users_1.forgotPasswordMail);
};
exports.default = userRoutes;
