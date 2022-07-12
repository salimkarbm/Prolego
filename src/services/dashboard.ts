import DB from '../config/database';
import AppError from '../utils/errors/appError';
import { StudentInfo } from '../utils/interface/studentInfo';

class DashboardService {
  async PredictStudentStatus(status: string, id: string) {
    try {
      const sql = `UPDATE students_info SET studentstatus='${status}' WHERE id='${id}' RETURNING *`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`unable to update ${status}.`, 400);
    }
  }

  async notPredictedStudent(): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT * FROM students_info WHERE studentstatus IS NULL`;
      const result = await conn.query(sql);
      conn.release();
      const res = result.rows;
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch students from Database.`, 400);
    }
  }

  async predictedStudent(id: string): Promise<StudentInfo> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT * FROM students_info WHERE id =($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      const res = result.rows[0];
      return res;
    } catch (err) {
      throw new AppError(`Unable to fetch student from Database.`, 400);
    }
  }

  async graduate() {
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

  async dropout() {
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

  async totalStudents() {
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

  async studentAttendance(date: string) {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  date = '${date}'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for Day:${date}.`, 400);
    }
  }

  async presentAttendance(date: string) {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  date = '${date}' AND attendance = 'present'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for Day:${date}.`, 400);
    }
  }

  async absentAttendance(date: string) {
    try {
      const sql = `SELECT COUNT(*) FROM students_info WHERE  date = '${date}' AND attendance = 'absent'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      const student = result.rows[0];
      return student;
    } catch (err) {
      throw new AppError(`there is no attendance for Day:${date}.`, 400);
    }
  }
}

export default DashboardService;
