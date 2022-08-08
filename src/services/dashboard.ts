import DB from '../config/database';
import AppError from '../utils/errors/appError';
import {
  StudentInfo,
  StudentCount,
  TopStudents,
  Courses,
} from '../utils/interface/studentInfo';

class DashboardService {
  async saveStudentData(studentData: StudentInfo): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `INSERT INTO students_info (matNo,firstName,lastName,course,attendance,gender,ageAtEnrollment,region,maritalStatus,prevQualification,prevQualificationGrade,motherQualification,tuitionFee,fatherQualification,admissionGrade,schorlarship,firstSemesterCreditUnit,firstSemesterGrade,secondSemesterCreditUnit secondSemesterGrade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20) RETURNING *`;
      const data = Object.values(studentData);
      const res = await conn.query(sql, data);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new AppError(`Unable to create student.`, 400);
    }
  }

  async updateStudentData(studentData: StudentInfo): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `UPDATE students_info SET ,firstName=($1),lastName=($2),course=($3),attendance=($4),gender=($5),ageAtEnrollment=($6),region=($7),maritalStatus=($8),prevQualification=($9),prevQualificationGrade=($10),motherQualification=($11),tuitionFee=($12),fatherQualification=($13),admissionGrade=($14),schorlarship=($15),firstSemesterCreditUnit=($16),firstSemesterGrade=($17),secondSemesterCreditUnit=($18) secondSemesterGrade=($19) WHERE matno = ${studentData.matno} RETURNING *`;
      const data = Object.values(studentData);
      const res = await conn.query(sql, data);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new AppError(
        `Unable to update student with studentId: ${studentData.matno}.`,
        400
      );
    }
  }

  async getAllStudent(): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = 'SELECT * FROM students_info ORDER BY id ASC LIMIT 100';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`Unable to fetch students from Database.`, 400);
    }
  }

  async getStudent(studentId: string): Promise<StudentInfo> {
    try {
      const sql = `SELECT * FROM students_info WHERE matno=($1)`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [studentId]);
      const student = result.rows[0];
      conn.release();
      return student;
    } catch (err) {
      throw new AppError(`unable find student with id ${studentId}.`, 400);
    }
  }

  async studentCategory(
    status: string,
    limit: number | string
  ): Promise<StudentInfo[]> {
    try {
      const sql = `SELECT * FROM students_info  WHERE students_info.studentstatus=($1) OR students_info.gender=($1) OR students_info.maritalstatus=($1) OR students_info.region=($1) OR students_info.schorlarship=($1) ORDER BY students_info.secondsemestergrade DESC LIMIT  ${limit} `;
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`${status} does not exist.`, 400);
    }
  }

  async notPredictedStudent(): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT * FROM students_info WHERE studentstatus  IS NULL`;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows;
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch students from Database.`, 400);
    }
  }

  async studentStatus(status: string, studentId: string): Promise<StudentInfo> {
    try {
      const sql = `UPDATE students_info SET studentstatus='${status}' WHERE matno='${studentId}' RETURNING *`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`unable to update ${status}.`, 400);
    }
  }

  async predictStudent(studentId: string): Promise<StudentInfo> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT * FROM students_info WHERE matno=($1)`;
      const result = await conn.query(sql, [studentId]);
      conn.release();
      const res = result.rows[0];
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch student from Database.`, 400);
    }
  }

  async graduate(): Promise<StudentCount> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT COUNT(*) FROM students_info WHERE studentstatus = 'graduate' `;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows[0];
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch student from Database.`, 400);
    }
  }

  async dropout(): Promise<StudentCount> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT COUNT(*) FROM students_info WHERE studentstatus = 'dropout' `;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows[0];
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch student from Database.`, 400);
    }
  }

  async totalStudents(): Promise<StudentCount> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT COUNT(*) FROM students_info`;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows[0];
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch student from Database.`, 400);
    }
  }

  async studentAttendance(category: string): Promise<StudentCount> {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${category}' OR gender ='${category}'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for ${category}.`, 400);
    }
  }

  async presentAttendance(course: string): Promise<StudentCount> {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${course}' AND attendance = 'present'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for this:${course}.`, 400);
    }
  }

  async absentAttendance(course: string): Promise<StudentCount> {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  course = '${course}' AND attendance = 'absent'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for this:${course}.`, 400);
    }
  }

  async top5students(): Promise<TopStudents[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT firstsemestergrade,secondsemestergrade, firstname, lastname, (students_info.firstsemestergrade + students_info.secondsemestergrade) AS totalgrade FROM students_info ORDER BY totalgrade DESC LIMIT 5`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`unable get top 5 students`, 400);
    }
  }

  async top5studentsBycourse(course: string): Promise<TopStudents[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT firstsemestergrade,secondsemestergrade, firstname, lastname, (students_info.firstsemestergrade + students_info.secondsemestergrade) AS totalgrade FROM students_info WHERE students_info.course=($1) ORDER BY totalgrade DESC LIMIT 5`;
      const result = await conn.query(sql, [course]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`unable get top 5 students`, 400);
    }
  }

  async availableCourses(): Promise<Courses[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT DISTINCT course FROM students_info `;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows;
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch course from Database.`, 400);
    }
  }

  async search(searchparam: string): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT * FROM students_info WHERE firstname LIKE '%${searchparam}%' OR lastname LIKE '%${searchparam}%' OR matno LIKE '%${searchparam}%' `;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows;
      return res;
    } catch (err) {
      throw new AppError(`Unable to search student from Database.`, 400);
    }
  }
}

export default DashboardService;
