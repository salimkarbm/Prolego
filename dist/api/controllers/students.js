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
exports.show = exports.index = exports.saveDataToDB = void 0;
const csvtojsonConverter_1 = __importDefault(require("../../utils/csvtojsonConverter"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const students_1 = __importDefault(require("../../models/students"));
const store = new students_1.default();
const saveDataToDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentObj;
        const studentData = yield (0, csvtojsonConverter_1.default)();
        if (studentData instanceof Array) {
            // eslint-disable-next-line no-restricted-syntax
            for (const student of studentData) {
                studentObj = {
                    field: student.field1,
                    firstName: student.firstname,
                    lastName: student.lastname,
                    course: student.Course,
                    attendance: student.Attendance,
                    gender: student.Gender,
                    ageAtEnrollment: student.Age_at_Enroll,
                    nationality: student.Nationality,
                    maritalStatus: student.Marital_Status,
                    prevQualification: student.Prev_Qua,
                    prevQualificationGrade: student.Prev_Qua_Grade,
                    motherQualification: student.Mother_Qua,
                    tuitionFee: student.Tui_Up_to_Date,
                    fatherQualification: student.Father_Qua,
                    admissionGrade: student.Adm_Grade,
                    schorlarship: student.S_Holder,
                    firstSemesterCreditUnit: student.Cur_U_1st_Sem_Credit,
                    firstSemesterApproved: student.Cur_U_1st_Sem_Appr,
                    firstSemesterGrade: student.Cur_U_1st_Sem_Grade,
                    secondSemesterCreditUnit: student.Cur_U_2nd_Sem_Credit,
                    secondSemesterApproved: student.Cur_U_2nd_Sem_Approved,
                    secondSemesterGrade: student.Cur_U_2nd_Sem_Grade,
                };
                // eslint-disable-next-line no-await-in-loop
                yield store.saveStudentData(studentObj);
            }
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.saveDataToDB = saveDataToDB;
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield store.index();
        if (!students) {
            return next(new appError_1.default('Unable to fetch students from database', 404));
        }
        res.status(200).json(students);
    }
    catch (err) {
        return next(err);
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield store.show(req.params.field);
        if (!student)
            return next(new appError_1.default('student not found', 404));
        res.status(200).json(student);
    }
    catch (err) {
        next(err);
    }
});
exports.show = show;