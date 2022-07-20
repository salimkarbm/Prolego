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
const database_1 = __importDefault(require("../config/database"));
const appError_1 = __importDefault(require("../utils/errors/appError"));
class UserStore {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id =($1)';
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new appError_1.default(`Unable to find user with id:${id}.`, 500);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE email=($1)';
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql, [email]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new appError_1.default(`Unable to find user with Email:${email}.`, 500);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new appError_1.default(`unable to fetch users from database`, 500);
            }
        });
    }
    update(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE users SET password_digest=($1) WHERE id=${id} RETURNING *`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql, [password]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new appError_1.default(`Unable to update user with password:${password}.`, 500);
            }
        });
    }
}
exports.default = UserStore;
