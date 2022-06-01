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
const authentication_1 = __importDefault(require("../../services/authentication"));
const authStore = new authentication_1.default();
describe('Test users model', () => {
    let user;
    it('should have a create method', () => {
        expect(authStore.create).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield authStore.create({
            firstname: 'userOne',
            lastname: 'One',
            email: 'user@example.com',
            password: 'pass112',
        });
        expect(user.email).toEqual('user@example.com');
        expect(user.firstname).toEqual('userOne');
        expect(user.lastname).toEqual('One');
    }));
    it('create method input should not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield authStore.create({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        });
        expect(user.email).toBeFalsy();
        expect(user.firstname).toBeFalsy();
        expect(user.lastname).toBeFalsy();
        expect(user.password).toBeFalsy();
    }));
    it('password should be at least 5 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield authStore.create({
            firstname: 'one',
            lastname: 'two',
            email: 'two@example.com',
            password: 'pass',
        });
        expect(user.password).toBeFalsy();
    }));
    fit('should have a checkEmail method and return email not found if email does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.checkEmail('email not found');
        expect(authStore.checkEmail).toBeDefined();
        expect(result).toBeFalsy();
    }));
    fit('should have a checkEmail method and return true if email exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.checkEmail('user@example.com');
        expect(authStore.checkEmail).toBeDefined();
        expect(result).toBeTruthy();
    }));
    fit('authenticate method should validate the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.authenticate('user@example.com', 'pass112');
        expect(result).not.toBeNull();
        if (result) {
            expect(result.email).toEqual('user@example.com');
        }
    }));
    fit('authenticate method should reject the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.authenticate('userEmail', 'invalidpassword');
        expect(result).toBeNull();
    }));
});
