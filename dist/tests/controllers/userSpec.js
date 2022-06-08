"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes', () => {
    it('should update a user /api/v1/users/17', (done) => {
        request.patch(`/api/v1/users/17`).then((res) => {
            expect(res.status).toBe(404);
            expect(res.body.success).toBeFalsy();
            done();
        });
    });
    it('Update users /api/v1/user/:id should not return an array of a single user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default);
        const result = yield response
            .get('/api/v1/user/19')
            .set('Accept', 'application/json');
        expect(result.status).toBe(404);
        expect(result.body.status).toEqual('fail');
        expect(result.type).toEqual('application/json');
    }));
    it('update user routes to expect bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .patch(`/api/v1/users/17`)
            .set('Accept', 'application/json')
            .send({ email: 'emmanuel@gmail.com' })
            .expect(400);
    }));
});
