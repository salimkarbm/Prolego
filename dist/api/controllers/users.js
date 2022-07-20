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
exports.changedPassword = exports.index = exports.getUserByEmail = exports.getUserById = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../../models/user"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const httpsCookie_1 = __importDefault(require("../../utils/httpsCookie"));
const store = new user_1.default();
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield store.getUserById(id);
        if (!user) {
            return next(new appError_1.default('user not found', 400));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createdAt: user.created_at,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(errors);
    }
    try {
        const email = req.body.email;
        const user = yield store.getUserByEmail(email);
        if (!user) {
            return next(new appError_1.default('user not found', 400));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createdAt: user.created_at,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getUserByEmail = getUserByEmail;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        if (!users) {
            return new appError_1.default('users not found', 400);
        }
        const allUser = users.map((el) => {
            const userObj = {
                id: el.id,
                firstName: el.firstname,
                lastname: el.lastname,
                email: el.email,
                googleId: el.google_id,
                creatAt: el.created_at,
            };
            return userObj;
        });
        res.status(200).json({
            status: 'success',
            result: allUser.length,
            data: {
                allUser,
            },
        });
    }
    catch (err) {
        throw new appError_1.default('Something went wrong, Unable to get users', 400);
    }
});
exports.index = index;
const changedPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(errors);
    }
    const { password } = req.body;
    try {
        const user = yield store.getUserById(req.user.id);
        const updatedUser = yield store.update(user.id, password);
        (0, httpsCookie_1.default)(updatedUser, 200, req, res);
    }
    catch (err) {
        next(err);
    }
});
exports.changedPassword = changedPassword;
