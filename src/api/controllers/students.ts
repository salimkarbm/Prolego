import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fileConverter from '../../utils/csvtojsonConverter';
import AppError from '../../utils/errors/appError';
import { StudentInfo } from '../../utils/interface/studentInfo';
import StudentInfoStore from '../../models/students';

const cwd = process.cwd();

const store = new StudentInfoStore();

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.files?.mFile as UploadedFile;
    const saveFilePath = path.join(cwd, 'data', 'upload', file.name);
    await file.mv(saveFilePath);
    const studentData = await fileConverter(saveFilePath);
    if (studentData instanceof Array) {
      let studentObj: StudentInfo;
      // eslint-disable-next-line no-restricted-syntax
      for (const student of studentData) {
        studentObj = {
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
        await store.saveStudentData(studentObj);
      }
      res
        .status(200)
        .json({ status: 'success', message: 'file uploaded successfully' });
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

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await store.show(req.params.id);
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
    const category = await store.studentCategory(status);
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
