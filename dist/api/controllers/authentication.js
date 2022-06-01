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
exports.create = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtCredentials_1 = require("../../utils/jwtCredentials");
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const authentication_1 = __importDefault(require("../../services/authentication"));
const store = new authentication_1.default();
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
        const userEmail = yield store.checkEmail(user.email);
        if (userEmail) {
            return next(new appError_1.default('user with this email already exist', 400));
        }
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, jwtCredentials_1.secret, {
            expiresIn: jwtCredentials_1.expiresIn,
        });
        return res.status(201).json({
            status: 'success',
            token,
            data: {
                newUser,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.create = create;
exports.default = exports.create;
