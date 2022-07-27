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
xdescribe('Test User controller', () => {
    let originalTimeout;
    const request = (0, supertest_1.default)(server_1.default);
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
            expect(res.body.success).toBeFalsy();
            done();
        });
    });
    it('Request /api/v1/users/:id to return a single user', (done) => {
        request.get('/api/v1/users/1').then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.status).toEqual('success');
            done();
        });
    });
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Request /api/v1/users/:id should not return false', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default);
        const result = yield response
            .get('/api/v1/users/17')
            .set('Accept', 'application/json');
        expect(result.status).toBe(401);
        expect(result.type).toEqual('application/json');
    }));
    it('index endpoint should return all of the users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/v1/users')
            .set('Accept', 'application/json');
        expect(response.body.status).toEqual('success');
        expect(response.body.data.allUser).toEqual([]);
    }));
});
