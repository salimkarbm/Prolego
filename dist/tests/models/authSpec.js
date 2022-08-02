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
describe('Test auth model', () => {
    const newUser = {
        firstname: 'admin',
        lastname: 'user',
        password_digest: 'pass1234',
        email: 'admin@example.com',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield authStore.create(newUser);
        expect(user.email).toEqual('admin@example.com');
        expect(user.firstname).toEqual('admin');
    }));
    it('should have a create method', () => {
        expect(authStore.create).toBeDefined();
    });
    it('create method values should not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const freshUser = {
            firstname: '',
            lastname: '',
            email: '',
            password_digest: '',
        };
        if (newUser.firstname === '' ||
            newUser.lastname === '' ||
            newUser.email === '' ||
            newUser.password_digest === '') {
            expect(newUser.email).toBeFalsy();
            expect(newUser.firstname).toBeFalsy();
            expect(newUser.lastname).toBeFalsy();
            expect(newUser.password_digest).toBeFalsy();
        }
        else {
            yield authStore.create(freshUser);
        }
    }));
    it('password should be at least 8 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = {
            firstname: 'admin',
            lastname: 'admin',
            password_digest: 'pass',
            email: 'admin@example.com',
        };
        if (user1.password_digest.length !== 8)
            expect(user1.password_digest.length).toBeLessThan(8);
    }));
    it('should have a checkEmail method and return email not found if email does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.checkEmail('email not found');
        expect(authStore.checkEmail).toBeDefined();
        expect(result).toBeFalsy();
    }));
    it('should have a checkEmail method and return true if email exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.checkEmail('admin@example.com');
        expect(authStore.checkEmail).toBeDefined();
        expect(result).toBeTruthy();
    }));
    it('authenticate method should validate the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginUser = {
            email: 'admin@example.com',
            password: 'pass1234',
        };
        const result = yield authStore.authenticate(loginUser);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.email).toEqual('admin@example.com');
        }
    }));
    it('authenticate method should reject the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginUser = {
            email: 'userEmail',
            password: 'invalidpassword',
        };
        const result = yield authStore.authenticate(loginUser);
        expect(result).toBeNull();
    }));
    it('it should have reset password method', () => {
        expect(authStore.passwordResetToken).toBeDefined();
    });
    it('pasword reset method should return user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authStore.passwordResetToken('admin@example.com', '3hzc0fkip9h');
        expect(result).toBeTruthy();
    }));
    it('it should have update password method', () => {
        expect(authStore.updatePassword).toBeDefined();
    });
    it('it should have upsertGoogleUser method', () => {
        expect(authStore.upsertGoogleUser).toBeDefined();
    });
});
