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
class DashboardService {
    PredictStudentStatus(status, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE students_info SET studentstatus='${status}' WHERE id='${id}' RETURNING *`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                const student = result.rows[0];
                return student;
            }
            catch (err) {
                throw new appError_1.default(`unable to update ${status}.`, 400);
            }
        });
    }
    notPredictedStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info WHERE studentstatus IS NULL`;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows;
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch students from Database.`, 400);
            }
        });
    }
    predictedStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info WHERE id =($1)`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                const res = result.rows[0];
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch students from Database.`, 400);
            }
        });
    }
    studentAttendance(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM students_info WHERE  date = '${date}'`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                const student = result.rows;
                return student;
            }
            catch (err) {
                throw new appError_1.default(`there is no attendance for Day:${date}.`, 400);
            }
        });
    }
}
exports.default = DashboardService;
