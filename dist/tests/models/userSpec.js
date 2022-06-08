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
const user_1 = __importDefault(require("../../models/user"));
const users = new user_1.default();
describe('User model', () => {
    it('should have getall method', () => {
        expect(users.getAllUsers).toBeDefined();
    });
    it('should return the specific number of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.getAllUsers();
        expect(result.length).toEqual(12);
    }));
    it('should prove users are more than 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.getAllUsers();
        expect(result.length).toBeGreaterThan(0);
    }));
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield users.getAllUsers();
        expect(data).toContain(jasmine.objectContaining({}));
    }));
});
