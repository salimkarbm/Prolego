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
describe('test', () => {
    it('it should have a getUser', () => {
        expect(users.getUserById).toBeDefined();
    });
    it('getUserById should return this user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = users.getUserById(2);
        expect(users.getUserById).toBeDefined();
        expect(result).toBeTruthy();
    }));
    it('getUserById method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 18;
        const result = yield users.getUserById(id);
        expect(result).toBeDefined();
    }));
});
