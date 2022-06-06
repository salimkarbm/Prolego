"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const users = new user_1.default();
describe('User model', () => {
    it('should have getall method', () => {
        expect(users.updateUser).toBeDefined();
    });
});
