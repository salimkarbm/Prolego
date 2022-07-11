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
exports.attendance = exports.predictStudentById = exports.predict = void 0;
const axios_1 = __importDefault(require("axios"));
const dashboard_1 = __importDefault(require("../../services/dashboard"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const studentInfo_1 = require("../../utils/interface/studentInfo");
const store = new dashboard_1.default();
const predict = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let status: string;
    // const student = await store.notPredictedStudent();
    // const response = await axios.post(
    // if (response === 1) {
    //   status = 'Graduate';
    // } else if (response === 0) {
    //   status = 'Dropout';
    // } else {
    //   status = 'Predict';
    // }
    try {
        // const studentStatus = await store.PredictStudentStatus(status);
        res.status(200).json({
            status: 'success',
            data: {
            // student,
            },
        });
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
                status = 'Dropout';
            }
            else if (response.data.prediction[0] === 0) {
                status = 'Graduate';
            }
            else {
                status = 'Predict';
            }
            const studentStatus = yield store.PredictStudentStatus(status, req.params.id);
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
const attendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    try {
        const day = yield store.studentAttendance(date);
        if (!day)
            return next(new appError_1.default('attendance not found', 404));
        res.status(200).json({
            status: 'success',
            data: {
                day,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.attendance = attendance;
