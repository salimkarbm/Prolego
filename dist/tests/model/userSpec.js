"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const users = new user_1.UserStore();
describe('User model', () => {
    it('should have getall method', () => {
        expect(users.updateUser).toBeDefined();
    });
});
