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
exports.courses = exports.top5studentsbycourse = exports.top5students = exports.attendance = exports.predictionSummary = exports.predictStudentById = exports.predictAll = exports.studentByCategory = exports.getStudent = exports.getAllStudent = exports.upload = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const csvtojsonConverter_1 = __importDefault(require("../../utils/csvtojsonConverter"));
const dashboard_1 = __importDefault(require("../../services/dashboard"));
const appError_1 = __importDefault(require("../../utils/errors/appError"));
const studentInfo_1 = require("../../utils/interface/studentInfo");
const cwd = process.cwd();
const store = new dashboard_1.default();
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
                    matno: student.matno,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    course: student.Course,
                    attendance: student.Attendance,
                    gender: student.Gender,
                    ageatenrollment: student.Age_at_Enroll,
                    region: student.Region,
                    maritalstatus: student.Marital_Status,
                    prevqualification: student.Prev_Qua,
                    prevqualificationgrade: student.Prev_Qua_Grade,
                    motherqualification: student.Mother_Qua,
                    tuitionfee: student.Tui_Up_to_Date,
                    fatherqualification: student.Father_Qua,
                    admissiongrade: student.Adm_Grade,
                    schorlarship: student.S_Holder,
                    firstsemestercreditunit: student.Cur_U_1st_Sem_Credit,
                    firstsemestergrade: student.Cur_U_1st_Sem_Grade,
                    secondsemestercreditunit: student.Cur_U_2nd_Sem_Credit,
                    secondsemestergrade: student.Cur_U_2nd_Sem_Grade,
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
const getAllStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield store.getAllStudent();
        if (!students) {
            return next(new appError_1.default('Unable to fetch students from database', 400));
        }
        res.status(200).json({
            status: 'success',
            result: students.length,
            data: {
                students,
            },
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllStudent = getAllStudent;
const getStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.matno;
    if (!studentId) {
        return next(new appError_1.default('student id not found', 404));
    }
    try {
        const student = yield store.getStudent(studentId);
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
exports.getStudent = getStudent;
const studentByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.category;
        const category = yield store.studentCategory(status);
        if (category.length === 0) {
            return next(new appError_1.default('Not found', 404));
        }
        res.status(200).json({
            status: 'success',
            result: category.length,
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
const predictAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield store.notPredictedStudent();
    if (students.length === 0)
        return next(new appError_1.default('student not found', 404));
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
            yield store.studentStatus(status, student.matno);
        }
        res
            .status(200)
            .json({ status: 'success', message: 'Predicted successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.predictAll = predictAll;
const predictStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let status;
    const student = yield store.predictStudent(req.params.matno);
    try {
        if (!student) {
            return next(new appError_1.default(`Unable to find student with this matno:${req.params.matno}`, 404));
        }
        const response = yield axios_1.default.post(`https://prolego-api.herokuapp.com/predict?Marital_Status=${student.maritalstatus}&Course=${studentInfo_1.course.get(student.course)}&Attendance=${student.attendance}&Prev_Qua=${student.prevqualification}&Prev_Qua_Grade=${student.prevqualificationgrade}&Region=${studentInfo_1.region.get(student.region)}&Mother_Qua=${studentInfo_1.motherQua.get(student.motherqualification)}&Father_Qua=${studentInfo_1.fatherQua.get(student.fatherqualification)}&Adm_Grade=${student.admissiongrade}&Tui_Up_to_Date=${student.tuitionfee}&Gender=${student.gender}&S_Holder=${student.schorlarship}&Age_at_Enroll=${student.ageatenrollment}&Cur_U_1st_Sem_Credit=${student.firstsemestercreditunit}&Cur_U_1st_Sem_Grade=${student.firstsemestergrade}&Cur_U_2nd_Sem_Credit=${student.secondsemestercreditunit}&Cur_U_2nd_Sem_Grade=${student.secondsemestergrade}`);
        if (response.data.prediction[0] === 1) {
            status = 'dropout';
        }
        else if (response.data.prediction[0] === 0) {
            status = 'graduate';
        }
        else {
            return next(new appError_1.default('Unable to predict student', 500));
        }
        const studentStatus = yield store.studentStatus(status, student.matno);
        if (!studentStatus)
            return next(new appError_1.default('unable to update student status', 400));
        res.status(200).json({
            status: 'success',
            data: {
                studentStatus,
            },
        });
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
    console.log(totalNumberOfStudents, graduates, dropouts);
    try {
        const dropoutStudents = (dropouts.count / totalNumberOfStudents.count) *
            100;
        const graduatedStudents = (graduates.count / totalNumberOfStudents.count) *
            100;
        const totalStudents = parseInt(totalNumberOfStudents.count, 10);
        const percentageOfDropoutStudents = `${dropoutStudents}%`;
        const percentageOfgraduatedStudents = `${graduatedStudents}%`;
        res.status(200).json({
            status: 'success',
            data: {
                totalStudents,
                percentageOfDropoutStudents,
                percentageOfgraduatedStudents,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.predictionSummary = predictionSummary;
const attendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseOfStudy } = req.query;
    const totalAttendanceByDay = yield store.studentAttendance(courseOfStudy);
    if (!courseOfStudy) {
        return next(new appError_1.default(`This ${courseOfStudy} does not exist`, 404));
    }
    try {
        const absent = yield store.absentAttendance(courseOfStudy);
        const present = yield store.presentAttendance(courseOfStudy);
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
