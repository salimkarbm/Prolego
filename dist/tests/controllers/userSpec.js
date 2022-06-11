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
/* eslint-disable no-template-curly-in-string */
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes', () => {
    let originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('should require on GET /api/v1/users', (done) => {
        request.get('/api/v1/users').then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toBeFalsy();
            done();
        });
    });
    it('Request /api/v1/user/${id} to be return 200', (done) => {
        request.get('/api/v1/users/17').then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBeFalsy();
            done();
        });
    });
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Request /api/v1/user/:id should not return an array of a single user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default);
        const result = yield response
            .get('/api/v1/user/17')
            .set('Accept', 'application/json');
        expect(result.status).toBe(404);
        expect(result.body.status).toEqual('fail');
        expect(result.type).toEqual('application/json');
    }));
});
