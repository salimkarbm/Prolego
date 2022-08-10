"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authentication_1 = require("../controllers/authentication");
const authentication_2 = __importDefault(require("../../middlewares/authentication"));
const authRoutes = (app) => {
    app.post('/api/v1/signup', [
        (0, express_validator_1.check)('firstname', 'First Name is required')
            .trim()
            .escape()
            .notEmpty()
            .isString(),
        (0, express_validator_1.check)('lastname', 'Last Name is required')
            .trim()
            .escape()
            .notEmpty()
            .isString(),
        (0, express_validator_1.check)('email').isEmail().trim().escape().normalizeEmail().notEmpty(),
        (0, express_validator_1.check)('password').isLength({ min: 8 }).trim().escape().notEmpty(),
    ], authentication_1.create);
    app.post('/api/v1/login', [
        (0, express_validator_1.check)('email').isEmail().trim().escape().normalizeEmail().not().isEmpty(),
        (0, express_validator_1.check)('password').isLength({ min: 8 }).trim().escape().notEmpty(),
    ], authentication_1.authenticate, authentication_2.default);
    app.post('/api/v1/auth/google', authentication_1.googleAuth);
    app.post('/api/v1/users/forgotpassword', [
        (0, express_validator_1.check)('email')
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .notEmpty()
            .isString(),
    ], authentication_1.forgotPassword);
    app.patch('/api/v1/users/auth/resetpassword', [
        (0, express_validator_1.check)('token').trim().escape().notEmpty().isString(),
        (0, express_validator_1.check)('password').trim().escape().notEmpty().isString(),
        (0, express_validator_1.check)('confirmPassword').trim().escape().notEmpty().isString(),
    ], authentication_1.resetPassword);
};
exports.default = authRoutes;
