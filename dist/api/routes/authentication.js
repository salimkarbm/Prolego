"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authentication_1 = require("../controllers/authentication");
const authRoutes = (app) => {
    app.post('/api/v1/signup', [
        (0, express_validator_1.check)('firstname', 'First Name is required')
            .trim()
            .escape()
            .not()
            .isEmpty(),
        (0, express_validator_1.check)('lastname', 'Last Name is required')
            .trim()
            .escape()
            .not()
            .isEmpty(),
        (0, express_validator_1.check)('email', 'Email is required')
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .not()
            .isEmpty(),
        (0, express_validator_1.check)('password', 'Password is required')
            .isLength({ min: 5 })
            .trim()
            .escape()
            .not()
            .isEmpty(),
    ], authentication_1.create);
    app.post('/api/v1/login', [
        (0, express_validator_1.check)('email', 'Email is required')
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .not()
            .isEmpty(),
        (0, express_validator_1.check)('password', 'Password is required')
            .isLength({ min: 5 })
            .trim()
            .escape()
            .not()
            .isEmpty(),
    ], authentication_1.authenticate);
};
exports.default = authRoutes;
