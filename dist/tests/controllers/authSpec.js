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
xdescribe('Test users endpoints', () => {
    let originalTimeout;
    const request = (0, supertest_1.default)(server_1.default);
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('/api/v1/signup endpoint should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/api/v1/signup')
            .set('Accept', 'application/json')
            .send({
            firstname: 'UserOne',
            lastname: 'User',
            email: 'user@example.com',
            password: 'pass1234',
        });
        expect(result.body.status).toEqual('success');
        expect(result.type).toEqual('application/json');
    }));
    it('/api/v1/login endpoint should login the users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/api/v1/login')
            .set('Accept', 'application/json')
            .send({
            email: 'user@example.com',
            password: 'pass1234',
        });
        expect(result.body.status).toEqual('success');
        expect(result.type).toEqual('application/json');
        expect(result.body.token).toBeInstanceOf(String);
    }));
    it('/api/v1/users-email endpoint should get users by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .get('/api/v1/users-email')
            .set('Accept', 'application/json')
            .send({
            email: 'user@example.com',
        });
        expect(result.body.status).toEqual('success');
        expect(result.status).toEqual(200);
        expect(result.type).toEqual('application/json');
        expect(result.body.data.email).toEqual('user@example.com');
    }));
    it('/api/v1/users/forgotpassword endpoint should send a mail', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request
            .post('/api/v1/users/forgotpassword')
            .set('Accept', 'application/json')
            .send({
            email: 'user@example.com',
        });
        expect(result.status).toEqual(200);
        expect(result.type).toEqual('application/json');
    }));
});
