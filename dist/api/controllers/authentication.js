"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.create = void 0;
const express_validator_1 = require("express-validator");
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const authentication_1 = __importDefault(require("../../services/authentication"));
const httpsCookie_1 = __importDefault(require("../../utils/httpsCookie"));
const authStore = new authentication_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        return next(err);
    }
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const userEmail = yield authStore.checkEmail(user.email);
        if (userEmail) {
            return next(new appError_1.default('user with this email already exist', 400));
        }
        const newUser = yield authStore.create(user);
        (0, httpsCookie_1.default)(newUser, 201, req, res);
    }
    catch (err) {
        return next(err);
    }
});
exports.create = create;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = {
        password: req.body.password,
        email: req.body.email,
    };
    try {
        const user = yield authStore.authenticate(loginUser.email, loginUser.password);
        if (user === null) {
            return next(new appError_1.default('incorrect password or email', 400));
        }
        (0, httpsCookie_1.default)(user, 200, req, res);
    }
    catch (err) {
        return next(err);
    }
});
exports.authenticate = authenticate;
