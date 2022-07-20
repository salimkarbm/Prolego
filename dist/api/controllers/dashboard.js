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
exports.courses = exports.top5studentsbycourse = exports.top5students = exports.attendance = exports.predictionSummary = exports.predictStudentById = exports.predict = void 0;
const axios_1 = __importDefault(require("axios"));
const dashboard_1 = __importDefault(require("../../services/dashboard"));
// import AppError from '../../utils/errors/appError';
const studentInfo_1 = require("../../utils/interface/studentInfo");
const store = new dashboard_1.default();
const predict = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield store.notPredictedStudent();
    try {
        // eslint-disable-next-line no-restricted-syntax
        for (const student of students) {
            // eslint-disable-next-line no-await-in-loop
            const response = yield axios_1.default.post(`https://prolego-api.herokuapp.com/predict?Marital_Status=${student.maritalstatus}&Course=${studentInfo_1.course.get(student.course)}&Attendance=${student.attendance}&Prev_Qua=${student.prevqualification}&Prev_Qua_Grade=${student.prevqualificationgrade}&Region=${studentInfo_1.region.get(student.region)}&Mother_Qua=${studentInfo_1.motherQua.get(student.motherqualification)}&Father_Qua=${studentInfo_1.fatherQua.get(student.fatherqualification)}&Adm_Grade=${student.admissiongrade}&Tui_Up_to_Date=${student.tuitionfee}&Gender=${student.gender}&S_Holder=${student.schorlarship}&Age_at_Enroll=${student.ageatenrollment}&Cur_U_1st_Sem_Credit=${student.firstsemestercreditunit}&Cur_U_1st_Sem_Grade=${student.firstsemestergrade}&Cur_U_2nd_Sem_Credit=${student.secondsemestercreditunit}&Cur_U_2nd_Sem_Grade=${student.secondsemestergrade}`);
            let status;
            if (response.data.prediction[0] === 1) {
                status = 'dropout';
            }
            else if (response.data.prediction[0] === 0) {
                status = 'graduate';
            }
            else {
                status = 'predict';
            }
            // eslint-disable-next-line no-await-in-loop
            yield store.PredictStudentStatus(status, student.id);
        }
        res
            .status(200)
            .json({ status: 'success', message: 'Prediction successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.predict = predict;
const predictStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let status;
    const student = yield store.predictedStudent(req.params.id);
    try {
        if (student) {
            const response = yield axios_1.default.post(`https://prolego-api.herokuapp.com/predict?Marital_Status=${student.maritalstatus}&Course=${studentInfo_1.course.get(student.course)}&Attendance=${student.attendance}&Prev_Qua=${student.prevqualification}&Prev_Qua_Grade=${student.prevqualificationgrade}&Region=${studentInfo_1.region.get(student.region)}&Mother_Qua=${studentInfo_1.motherQua.get(student.motherqualification)}&Father_Qua=${studentInfo_1.fatherQua.get(student.fatherqualification)}&Adm_Grade=${student.admissiongrade}&Tui_Up_to_Date=${student.tuitionfee}&Gender=${student.gender}&S_Holder=${student.schorlarship}&Age_at_Enroll=${student.ageatenrollment}&Cur_U_1st_Sem_Credit=${student.firstsemestercreditunit}&Cur_U_1st_Sem_Grade=${student.firstsemestergrade}&Cur_U_2nd_Sem_Credit=${student.secondsemestercreditunit}&Cur_U_2nd_Sem_Grade=${student.secondsemestergrade}`);
            if (response.data.prediction[0] === 1) {
                status = 'dropout';
            }
            else if (response.data.prediction[0] === 0) {
                status = 'graduate';
            }
            else {
                status = 'predict';
            }
            const studentStatus = yield store.PredictStudentStatus(status, student.id);
            res.status(200).json({
                status: 'success',
                data: {
                    studentStatus,
                },
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.predictStudentById = predictStudentById;
const predictionSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalNumberOfStudents = yield store.totalStudents();
    const graduates = yield store.graduate();
    const dropouts = yield store.dropout();
    try {
        const dropoutStudents = (dropouts.count / totalNumberOfStudents.count) *
            100;
        const graduatedStudents = (graduates.count / totalNumberOfStudents.count) *
            100;
        const totalStudents = parseInt(totalNumberOfStudents.count, 10);
        const totalDropoutStudents = `${dropoutStudents}%`;
        const totalgraduatedStudents = `${graduatedStudents}%`;
        res.status(200).json({
            status: 'success',
            data: {
                totalStudents,
                totalDropoutStudents,
                totalgraduatedStudents,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.predictionSummary = predictionSummary;
const attendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    const totalAttendanceByDay = yield store.studentAttendance(date);
    const absent = yield store.absentAttendance(date);
    const present = yield store.presentAttendance(date);
    try {
        const studentAbsent = (absent.count / totalAttendanceByDay.count) * 100;
        const studentPresent = (present.count / totalAttendanceByDay.count) *
            100;
        const percentageOfStudentAbsent = `${studentAbsent}%`;
        const percentageOfStudentPresent = `${studentPresent}%`;
        res.status(200).json({
            status: 'success',
            data: {
                percentageOfStudentAbsent,
                percentageOfStudentPresent,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.attendance = attendance;
const top5students = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const top5student = yield store.top5students();
        res.status(200).json({
            status: 'success',
            results: top5student.length,
            data: {
                top5student,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.top5students = top5students;
const top5studentsbycourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dept = req.query.course;
        const top5student = yield store.top5studentsBycourse(dept);
        res.status(200).json({
            status: 'success',
            results: top5student.length,
            data: {
                top5student,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.top5studentsbycourse = top5studentsbycourse;
const courses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableCourses = yield store.availableCourses();
        res.status(200).json({
            status: 'success',
            results: availableCourses.length,
            data: {
                availableCourses,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.courses = courses;
