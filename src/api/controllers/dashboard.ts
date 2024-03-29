import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fileConverter from '../../utils/csvtojsonConverter';
import DashboardService from '../../services/dashboard';
import AppError from '../../utils/errors/appError';
import {
  courses,
  fatherQua,
  region,
  motherQua,
  StudentInfo,
  StudentCount,
} from '../../utils/interface/studentInfo';

const cwd = process.cwd();

const store = new DashboardService();

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.files?.mFile as UploadedFile;
    const saveFilePath = path.join(cwd, 'data', 'upload', file.name);
    if (!saveFilePath) {
      return new AppError('cannot find path to file', 404);
    }
    if (!(path.extname(saveFilePath) === '.csv')) {
      return new AppError('Please provide a CSV file', 400);
    }
    await file.mv(saveFilePath);
    const studentData = await fileConverter(saveFilePath);
    if (!studentData) {
      return new AppError('Unable to convert file', 404);
    }
    if (studentData instanceof Array) {
      let studentObj: StudentInfo;
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
        if (!(await store.getStudent(studentObj.matno))) {
          // eslint-disable-next-line no-await-in-loop
          await store.saveStudentData(studentObj);
        }
        // eslint-disable-next-line no-await-in-loop
        await store.updateStudentData(studentObj);
        // eslint-disable-next-line no-await-in-loop
        await store.predictStudent(studentObj.matno);
      }
      res
        .status(200)
        .json({ status: 'success', message: 'file uploaded successfully' });
    }
  } catch (err) {
    return next(err);
  }
};

export const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let limit = req.query.limit as unknown as number | string;
    if (limit === undefined || '') {
      limit = 'ALL';
    }
    const students = await store.getAllStudent(limit);
    if (!students) {
      return next(new AppError('Unable to fetch students from database', 400));
    }
    res.status(200).json({
      status: 'success',
      result: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentId = req.params.matno as string;
  if (!studentId) {
    return next(new AppError('student id not found', 404));
  }
  try {
    const student = await store.getStudent(studentId);
    if (!student) return next(new AppError('student not found', 404));
    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const studentByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.category as string;
    let limit = req.query.limit as unknown as number | string;
    if (limit === undefined || '') {
      limit = 'ALL';
    }
    if (status === '') {
      return next(new AppError(`Please provide a course`, 404));
    }
    const category = await store.studentCategory(status, limit);
    if (!category) {
      return next(new AppError(`This ${status} does not exist`, 404));
    }
    if (category.length === 0) {
      return next(new AppError('Not found', 404));
    }
    res.status(200).json({
      status: 'success',
      result: category.length,
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const predictAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const students = await store.notPredictedStudent();
  if (students.length === 0)
    return next(new AppError('student not found', 404));
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const student of students) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(
        `https://prolego-api.herokuapp.com/predict?Marital_Status=${
          student.maritalstatus
        }&Course=${courses.get(student.course)}&Attendance=${
          student.attendance
        }&Prev_Qua=${student.prevqualification}&Prev_Qua_Grade=${
          student.prevqualificationgrade
        }&Region=${region.get(student.region)}&Mother_Qua=${motherQua.get(
          student.motherqualification
        )}&Father_Qua=${fatherQua.get(student.fatherqualification)}&Adm_Grade=${
          student.admissiongrade
        }&Tui_Up_to_Date=${student.tuitionfee}&Gender=${
          student.gender
        }&S_Holder=${student.schorlarship}&Age_at_Enroll=${
          student.ageatenrollment
        }&Cur_U_1st_Sem_Credit=${
          student.firstsemestercreditunit
        }&Cur_U_1st_Sem_Grade=${
          student.firstsemestergrade
        }&Cur_U_2nd_Sem_Credit=${
          student.secondsemestercreditunit
        }&Cur_U_2nd_Sem_Grade=${student.secondsemestergrade}`
      );
      let status: string;
      if (response.data.prediction[0] === 1) {
        status = 'dropout';
      } else if (response.data.prediction[0] === 0) {
        status = 'graduate';
      } else {
        status = 'predict';
      }
      // eslint-disable-next-line no-await-in-loop
      await store.studentStatus(status, student.matno as string);
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Predicted successfully' });
  } catch (err) {
    next(err);
  }
};

export const predictStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status: string;
  const student = await store.predictStudent(req.params.matno as string);
  try {
    if (!student) {
      return next(
        new AppError(
          `Unable to find student with this matno:${req.params.matno}`,
          404
        )
      );
    }
    const response = await axios.post(
      `https://prolego-api.herokuapp.com/predict?Marital_Status=${
        student.maritalstatus
      }&Course=${courses.get(student.course)}&Attendance=${
        student.attendance
      }&Prev_Qua=${student.prevqualification}&Prev_Qua_Grade=${
        student.prevqualificationgrade
      }&Region=${region.get(student.region)}&Mother_Qua=${motherQua.get(
        student.motherqualification
      )}&Father_Qua=${fatherQua.get(student.fatherqualification)}&Adm_Grade=${
        student.admissiongrade
      }&Tui_Up_to_Date=${student.tuitionfee}&Gender=${
        student.gender
      }&S_Holder=${student.schorlarship}&Age_at_Enroll=${
        student.ageatenrollment
      }&Cur_U_1st_Sem_Credit=${
        student.firstsemestercreditunit
      }&Cur_U_1st_Sem_Grade=${
        student.firstsemestergrade
      }&Cur_U_2nd_Sem_Credit=${
        student.secondsemestercreditunit
      }&Cur_U_2nd_Sem_Grade=${student.secondsemestergrade}`
    );

    if (response.data.prediction[0] === 1) {
      status = 'dropout';
    } else if (response.data.prediction[0] === 0) {
      status = 'graduate';
    } else {
      return next(new AppError('Unable to predict student', 500));
    }
    const studentStatus = await store.studentStatus(
      status,
      student.matno as string
    );
    if (!studentStatus)
      return next(new AppError('unable to update student status', 400));
    res.status(200).json({
      status: 'success',
      data: {
        studentStatus,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const predictionSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const totalNumberOfStudents: StudentCount = await store.totalStudents();
  const totalNumberOfgraduates: StudentCount = await store.graduate();
  const totalNumberOfdropouts: StudentCount = await store.dropout();
  try {
    const data = [];
    const summary = {
      totalNumberOfStudents: totalNumberOfStudents.count,
      totalNumberOfgraduates: totalNumberOfgraduates.count,
      totalNumberOfdropouts: totalNumberOfdropouts.count,
    };
    data.push(summary);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const courseAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { course } = req.query;
  if (course === '') {
    return next(new AppError(`Please provide a course`, 404));
  }

  const courseOfStudy = await store.getCourse(course as string);
  if (!courseOfStudy) {
    return next(new AppError(`This ${course} does not exist`, 404));
  }
  const numberOfStudentsabsent = await store.absentAttendance(course as string);
  const numberOfStudentspresent = await store.presentAttendance(
    course as string
  );
  try {
    const data = [];
    const attendance = {
      course: courseOfStudy.course,
      numberOfStudentsabsent: numberOfStudentsabsent.count,
      numberOfStudentspresent: numberOfStudentspresent.count,
    };
    data.push(attendance);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const top5students = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const top5student = await store.top5students();
    res.status(200).json({
      status: 'success',
      results: top5student.length,
      data: {
        top5student,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const top5studentsbycourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course } = req.query;
    if (course === '') {
      return next(new AppError(`Please provide a course`, 404));
    }
    const top5student = await store.top5studentsBycourse(course as string);
    if (top5student.length === 0) {
      return next(new AppError(`This course:${course} does not exist`, 404));
    }
    res.status(200).json({
      status: 'success',
      results: top5student.length,
      data: {
        top5student,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const courseOfStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableCourses = await store.courses();
    res.status(200).json({
      status: 'success',
      results: availableCourses.length,
      data: {
        availableCourses,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { queryString } = req.query;
    if (queryString === '') {
      return next(new AppError(`Please provide a search params`, 404));
    }
    const response = await store.search(queryString as string);
    if (response.length === 0) {
      return next(new AppError(`not found`, 404));
    }
    res.status(200).json({
      status: 'success',
      results: response.length,
      data: {
        response,
      },
    });
  } catch (err) {
    next(err);
  }
};
