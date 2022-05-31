"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes', () => {
    let userId;
    // eslint-disable-next-line no-template-curly-in-string
    it('should update a user /users/${id}', (done) => {
        request.patch(`/api/v1/users/${userId}`).then((res) => {
            expect(res.status).toBe(404);
            expect(res.body.success).toBeFalsy();
            done();
        });
    });
});
