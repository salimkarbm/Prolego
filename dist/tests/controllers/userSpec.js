"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes', () => {
    it('should require on GET /users', (done) => {
        request.get('/api/v1/users').then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBeFalsy();
            done();
        });
    });
});
