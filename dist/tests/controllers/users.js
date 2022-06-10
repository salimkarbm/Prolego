"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Handler', () => {
    it('should require authorization on GET /user/${id}', (done) => {
        request.get('/api/v1/users/1').then((res) => {
            expect(res.status).toBe(401);
            expect(res.body.success).toBeFalse();
            done();
        });
    });
});
