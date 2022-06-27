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
class StudentInfoStore {
    saveStudentData(studenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `INSERT INTO students_info (field,firstName,lastName,course,attendance,gender,ageAtEnrollment,nationality,maritalStatus,prevQualification,prevQualificationGrade,  motherQualification,tuitionFee,fatherQualification,admissionGrade,schorlarship,firstSemesterCreditUnit,firstSemesterApproved,firstSemesterGrade,secondSemesterCreditUnit,secondSemesterApproved, secondSemesterGrade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,$22) RETURNING *`;
                const data = Object.values(studenData);
                const res = yield conn.query(sql, data);
                conn.release();
                return res.rows;
            }
            catch (err) {
                console.log(err);
                throw new appError_1.default(`Unable to create student.`, 400);
            }
        });
    }
}
exports.default = StudentInfoStore;
