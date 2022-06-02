"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiresIn = exports.secret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.secret = process.env.TOKEN_SECRET;
exports.expiresIn = process.env.JWT_EXPIRES_IN;
console.log(typeof exports.expiresIn);
