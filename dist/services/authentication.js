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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const appError_1 = __importDefault(require("../utils/errors/appError"));
const bcryptCredentials_1 = require("../utils/bcryptCredentials");
class AuthService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                firstName: user.firstname,
                lastName: user.lastname,
                password: user.password,
                email: user.email,
            };
            try {
                const conn = yield database_1.default.client.connect();
                const sql = 'INSERT INTO users (firstname, lastname, password_digest, email) VALUES($1, $2, $3, $4) RETURNING * ';
                const hash = yield bcrypt_1.default.hash(newUser.password + bcryptCredentials_1.pepper, bcryptCredentials_1.saltRound);
                const result = yield conn.query(sql, [
                    newUser.firstName,
                    newUser.lastName,
                    hash,
                    newUser.email,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new appError_1.default(`Unable to create user ${newUser.firstName},`, 400);
            }
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE email = '${email}'`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                return !!result.rows[0];
            }
            catch (err) {
                throw new appError_1.default(`Something went wrong,`, 400);
            }
        });
    }
}
exports.default = AuthService;
