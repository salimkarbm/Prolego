"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const users = new user_1.UserStore();
describe('test', () => {
    it('it should have a getUser', () => {
        expect(users.getUserById).toBeDefined();
    });
});
