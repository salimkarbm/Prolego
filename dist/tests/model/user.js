"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const users = new user_1.UserStore();
<<<<<<< HEAD
describe('User model', () => {
    it('should have getall method', () => {
        expect(users.getUsers).toBeDefined();
=======
describe('test', () => {
    it('it should have a getUser', () => {
        expect(users.getUserById).toBeDefined();
>>>>>>> 0eb42c9a7c8bf01e1bba74d41c3b8bc0bb8919e0
    });
});
