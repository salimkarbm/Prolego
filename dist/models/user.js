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
exports.UserStore = void 0;
/* eslint-disable import/prefer-default-export */
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const bcryptCredentials_1 = require("../utils/bcryptCredentials");
class UserStore {
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `UPDATE users SET email = ($1), firstname = ($2), lastname = ($3), password_digest = ($4) WHERE id = ${id} RETURNING *`;
                const hash = yield bcrypt_1.default.hash(user.password + bcryptCredentials_1.pepper, bcryptCredentials_1.saltRound);
                const values = [
                    user.email,
                    user.firstname,
                    user.lastname,
                    hash,
                ];
                const result = yield conn.query(sql, values);
                const users = result.rows[0];
                conn.release();
                return users;
            }
            catch (error) {
                throw new Error(`could not update users ${user.email}. Not Found: ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
