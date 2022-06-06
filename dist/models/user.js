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
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `UPDATE users SET firstname = ($1), lastname = ($2), password_digest = ($3), email = ($4) WHERE id = '${id}' RETURNING *`;
                const values = [
                    user.firstname,
                    user.lastname,
                    user.password,
                    user.email,
                ];
                const result = yield conn.query(sql, values);
                const users = result.rows[0];
                console.log(result, 'yeah');
                conn.release();
                return users;
            }
            catch (error) {
                throw new appError_1.default(`could not update user ${user.email}`, 400);
            }
        });
    }
}
exports.default = UserStore;