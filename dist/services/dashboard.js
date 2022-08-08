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
    saveStudentData(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `INSERT INTO students_info (matNo,firstName,lastName,course,attendance,gender,ageAtEnrollment,region,maritalStatus,prevQualification,prevQualificationGrade,motherQualification,tuitionFee,fatherQualification,admissionGrade,schorlarship,firstSemesterCreditUnit,firstSemesterGrade,secondSemesterCreditUnit secondSemesterGrade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20) RETURNING *`;
                const data = Object.values(studentData);
                const res = yield conn.query(sql, data);
                conn.release();
                return res.rows;
            }
            catch (err) {
                throw new appError_1.default(`Unable to create student.`, 400);
            }
        });
    }
    updateStudentData(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `UPDATE students_info SET ,firstName=($1),lastName=($2),course=($3),attendance=($4),gender=($5),ageAtEnrollment=($6),region=($7),maritalStatus=($8),prevQualification=($9),prevQualificationGrade=($10),motherQualification=($11),tuitionFee=($12),fatherQualification=($13),admissionGrade=($14),schorlarship=($15),firstSemesterCreditUnit=($16),firstSemesterGrade=($17),secondSemesterCreditUnit=($18) secondSemesterGrade=($19) WHERE matno = ${studentData.matno} RETURNING *`;
                const data = Object.values(studentData);
                const res = yield conn.query(sql, data);
                conn.release();
                return res.rows[0];
            }
            catch (err) {
                throw new appError_1.default(`Unable to update student with studentId: ${studentData.matno}.`, 400);
            }
        });
    }
    getAllStudent(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info ORDER BY id ASC LIMIT ${limit}`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch students from Database.`, 400);
            }
        });
    }
    getStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM students_info WHERE matno=($1)`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql, [studentId]);
                const student = result.rows[0];
                conn.release();
                return student;
            }
            catch (err) {
                throw new appError_1.default(`unable find student with id ${studentId}.`, 400);
            }
        });
    }
    studentCategory(status, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM students_info  WHERE students_info.studentstatus=($1) OR students_info.gender=($1) OR students_info.maritalstatus=($1) OR students_info.region=($1) OR students_info.schorlarship=($1) ORDER BY students_info.secondsemestergrade DESC LIMIT  ${limit} `;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql, [status]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new appError_1.default(`${status} does not exist.`, 400);
            }
        });
    }
    notPredictedStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info WHERE studentstatus  IS NULL`;
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
    studentStatus(status, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE students_info SET studentstatus='${status}' WHERE matno='${studentId}' RETURNING *`;
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
    predictStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info WHERE matno=($1)`;
                const result = yield conn.query(sql, [studentId]);
                conn.release();
                const res = result.rows[0];
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch student from Database.`, 400);
            }
        });
    }
    graduate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT COUNT(*) FROM students_info WHERE studentstatus = 'graduate' `;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows[0];
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch student from Database.`, 400);
            }
        });
    }
    dropout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT COUNT(*) FROM students_info WHERE studentstatus = 'dropout' `;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows[0];
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch student from Database.`, 400);
            }
        });
    }
    totalStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT COUNT(*) FROM students_info`;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows[0];
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch student from Database.`, 400);
            }
        });
    }
    studentAttendance(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${category}' OR gender ='${category}'`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                const student = result.rows[0];
                return student;
            }
            catch (err) {
                throw new appError_1.default(`there is no attendance for ${category}.`, 400);
            }
        });
    }
    presentAttendance(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${course}' AND attendance = 'present'`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                const student = result.rows[0];
                return student;
            }
            catch (err) {
                throw new appError_1.default(`there is no attendance for this:${course}.`, 400);
            }
        });
    }
    absentAttendance(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${course}' AND attendance = 'absent'`;
                const conn = yield database_1.default.client.connect();
                const result = yield conn.query(sql);
                conn.release();
                const student = result.rows[0];
                return student;
            }
            catch (err) {
                throw new appError_1.default(`there is no attendance for this:${course}.`, 400);
            }
        });
    }
    top5students() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT firstsemestergrade,secondsemestergrade, firstname, lastname, (students_info.firstsemestergrade + students_info.secondsemestergrade) AS totalgrade FROM students_info ORDER BY totalgrade DESC LIMIT 5`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new appError_1.default(`unable get top 5 students`, 400);
            }
        });
    }
    top5studentsBycourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT firstsemestergrade,secondsemestergrade, firstname, lastname, (students_info.firstsemestergrade + students_info.secondsemestergrade) AS totalgrade FROM students_info WHERE students_info.course=($1) ORDER BY totalgrade DESC LIMIT 5`;
                const result = yield conn.query(sql, [course]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new appError_1.default(`unable get top 5 students`, 400);
            }
        });
    }
    availableCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT DISTINCT course FROM students_info `;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows;
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to fetch course from Database.`, 400);
            }
        });
    }
    search(searchparam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.client.connect();
                const sql = `SELECT * FROM students_info WHERE firstname LIKE '%${searchparam}%' OR lastname LIKE '%${searchparam}%' OR matno LIKE '%${searchparam}%' `;
                const result = yield conn.query(sql);
                conn.release();
                const res = result.rows;
                return res;
            }
            catch (err) {
                throw new appError_1.default(`Unable to search student from Database.`, 400);
            }
        });
    }
}
exports.default = DashboardService;
