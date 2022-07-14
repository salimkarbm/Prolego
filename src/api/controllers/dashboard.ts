import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import DashboardService from '../../services/dashboard';
// import AppError from '../../utils/errors/appError';
import {
  course,
  fatherQua,
  region,
  motherQua,
} from '../../utils/interface/studentInfo';

const store = new DashboardService();

export const predict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const students = await store.notPredictedStudent();
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const student of students) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.post(
        `https://prolego-api.herokuapp.com/predict?Marital_Status=${
          student.maritalstatus
        }&Course=${course.get(student.course)}&Attendance=${
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
      await store.PredictStudentStatus(status, student.id as string);
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Prediction successfully' });
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
  const student = await store.predictedStudent(req.params.id);
  try {
    if (student) {
      const response = await axios.post(
        `https://prolego-api.herokuapp.com/predict?Marital_Status=${
          student.maritalstatus
        }&Course=${course.get(student.course)}&Attendance=${
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
        status = 'predict';
      }
      const studentStatus = await store.PredictStudentStatus(
        status,
        student.id as string
      );
      res.status(200).json({
        status: 'success',
        data: {
          studentStatus,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const predictionSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const totalNumberOfStudents = await store.totalStudents();
  const graduates = await store.graduate();
  const dropouts = await store.dropout();
  try {
    const dropoutStudents =
      (((dropouts.count as number) / totalNumberOfStudents.count) as number) *
      100;
    const graduatedStudents =
      (((graduates.count as number) / totalNumberOfStudents.count) as number) *
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
  } catch (err) {
    next(err);
  }
};

export const attendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.query;
  const totalAttendanceByDay = await store.studentAttendance(date as string);
  const absent = await store.absentAttendance(date as string);
  const present = await store.presentAttendance(date as string);
  try {
    const studentAbsent =
      (((absent.count as number) / totalAttendanceByDay.count) as number) * 100;
    const studentPresent =
      (((present.count as number) / totalAttendanceByDay.count) as number) *
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
    const dept = req.query.course;
    const top5student = await store.top5studentsBycourse(dept as string);
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

export const courses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableCourses = await store.availableCourses();
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
