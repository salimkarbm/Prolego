"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const userRoutes = (app) => {
    app.get('/api/v1/users', users_1.index);
    app.get('/api/v1/users/:id', authentication_1.default, users_1.getUserById);
    app.patch('/api/v1/users/changedmypassword', (0, express_validator_1.check)('password').isLength({ min: 8 }).trim().escape().notEmpty(), authentication_1.default, users_1.changedPassword);
    app.get('/api/v1/users-email', (0, express_validator_1.check)('email')
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail()
        .notEmpty()
        .isString(), users_1.getUserByEmail);
};
exports.default = userRoutes;
