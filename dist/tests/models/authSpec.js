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
const store = new authentication_1.default();
describe('Test users model', () => {
    let user;
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield store.create({
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
        user = yield store.create({
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
    it('password input should be at least 5 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield store.create({
            firstname: 'one',
            lastname: 'two',
            email: 'two@example.com',
            password: 'pass',
        });
        expect(user.password).toBeFalsy();
    }));
    it('should have an checkEmail method', () => {
        expect(store.checkEmail).toBeDefined();
    });
});
