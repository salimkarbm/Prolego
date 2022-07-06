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
exports.studentByCategory = exports.show = exports.index = exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const csvtojsonConverter_1 = __importDefault(require("../../utils/csvtojsonConverter"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const students_1 = __importDefault(require("../../models/students"));
const cwd = process.cwd();
const store = new students_1.default();
const upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.mFile;
        const saveFilePath = path_1.default.join(cwd, 'data', 'upload', file.name);
        yield file.mv(saveFilePath);
        const studentData = yield (0, csvtojsonConverter_1.default)(saveFilePath);
        if (studentData instanceof Array) {
            let studentObj;
            // eslint-disable-next-line no-restricted-syntax
            for (const student of studentData) {
                studentObj = {
                    firstName: student.firstname,
                    lastName: student.lastname,
                    course: student.Course,
                    attendance: student.Attendance,
                    gender: student.Gender,
                    ageAtEnrollment: student.Age_at_Enroll,
                    region: student.Region,
                    maritalStatus: student.Marital_Status,
                    prevQualification: student.Prev_Qua,
                    prevQualificationGrade: student.Prev_Qua_Grade,
                    motherQualification: student.Mother_Qua,
                    tuitionFee: student.Tui_Up_to_Date,
                    fatherQualification: student.Father_Qua,
                    admissionGrade: student.Adm_Grade,
                    schorlarship: student.S_Holder,
                    firstSemesterCreditUnit: student.Cur_U_1st_Sem_Credit,
                    firstSemesterGrade: student.Cur_U_1st_Sem_Grade,
                    secondSemesterCreditUnit: student.Cur_U_2nd_Sem_Credit,
                    secondSemesterGrade: student.Cur_U_2nd_Sem_Grade,
                };
                // eslint-disable-next-line no-await-in-loop
                yield store.saveStudentData(studentObj);
            }
            res
                .status(200)
                .json({ status: 'success', message: 'file uploaded successfully' });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.upload = upload;
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield store.index();
        if (!students) {
            return next(new appError_1.default('Unable to fetch students from database', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                students,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield store.show(req.params.id);
        if (!student)
            return next(new appError_1.default('student not found', 404));
        res.status(200).json({
            status: 'success',
            data: {
                student,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.show = show;
const studentByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.category;
        const category = yield store.studentCategory(status);
        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.studentByCategory = studentByCategory;
