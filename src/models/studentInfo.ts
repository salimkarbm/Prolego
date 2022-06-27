import DB from '../config/database';
import StudentInfo from '../utils/interface/studentInfo';
import AppError from '../utils/errors/appError';

class StudentInfoStore {
  async saveStudentData(studenData: StudentInfo): Promise<StudentInfo[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `INSERT INTO students_info (field,firstName,lastName,course,attendance,gender,ageAtEnrollment,nationality,maritalStatus,prevQualification,prevQualificationGrade,  motherQualification,tuitionFee,fatherQualification,admissionGrade,schorlarship,firstSemesterCreditUnit,firstSemesterApproved,firstSemesterGrade,secondSemesterCreditUnit,secondSemesterApproved, secondSemesterGrade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,$22) RETURNING *`;
      const data = Object.values(studenData);
      const res = await conn.query(sql, data);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new AppError(`Unable to create student.`, 400);
    }
  }
}
export default StudentInfoStore;
