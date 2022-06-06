"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../controllers/user"));
const userRouters = (app) => {
    app.patch('/api/v1/users/:id', user_1.default);
};
exports.default = userRouters;
