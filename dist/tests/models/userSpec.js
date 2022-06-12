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
const store = new user_1.default();
describe('test', () => {
    it('it should have a getUserById method', () => {
        expect(store.getUserById).toBeDefined();
    });
    it('getUserById  method should return a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        const result = yield store.getUserById(id);
        expect(store.getUserById).toBeDefined();
        expect(result).toBeTruthy();
    }));
    fit('should have a index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        console.log(result);
        expect(store.index).toBeDefined();
        expect(result).toBeInstanceOf(Array);
    }));
});
