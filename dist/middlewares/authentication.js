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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const jwtCredentials_1 = require("../utils/jwtCredentials");
const appError_1 = __importDefault(require("../utils/errors/appError"));
const store = new user_1.default();
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new appError_1.default('The user belonging to this token no longer exist', 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtCredentials_1.secret);
        if (!decoded) {
            return next(new appError_1.default('invalid token', 401));
        }
        const currentUser = yield store.getUserById(decoded.id);
        if (!currentUser) {
            return next(new appError_1.default('You are not logged in! please login to gain access.', 401));
        }
        req.user = currentUser;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = verifyAuthToken;
