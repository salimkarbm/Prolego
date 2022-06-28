import { Request, Response, NextFunction } from 'express';
import fileConverter from '../../utils/csvtojsonConverter';
import AppError from '../../utils/errors/appError';
import StudentInfo from '../../utils/interface/studentInfo';
import StudentInfoStore from '../../models/students';

const store = new StudentInfoStore();

export const saveDataToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let studentObj: StudentInfo;
    const studentData = await fileConverter();
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
        await store.saveStudentData(studentObj);
      }
    }
  } catch (err) {
    return next(err);
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await store.index();
    if (!students) {
      return next(new AppError('Unable to fetch students from database', 404));
    }
    res.status(200).json(students);
  } catch (err) {
    return next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await store.show(req.params.field);
    if (!student) return next(new AppError('student not found', 404));
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};
