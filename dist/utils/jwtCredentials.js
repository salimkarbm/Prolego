"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.jwtCookiesExpiresIn = exports.expiresIn = exports.secret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.secret = process.env.TOKEN_SECRET;
exports.expiresIn = process.env.JWT_EXPIRES_IN;
exports.jwtCookiesExpiresIn = parseInt(process.env.JWT_COOKIES_EXPIRES_IN, 10);
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, exports.secret, {
        expiresIn: exports.expiresIn,
    });
};
exports.signToken = signToken;
