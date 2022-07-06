interface StudentInfo {
  firstName?: string;
  lastName?: string;
  course: number;
  attendance: number;
  gender: number;
  ageAtEnrollment: number;
  region: number;
  maritalStatus: number;
  prevQualification: number;
  prevQualificationGrade: number;
  motherQualification: number;
  tuitionFee: number;
  fatherQualification: number;
  admissionGrade: number;
  schorlarship: number;
  firstSemesterCreditUnit: number;
  firstSemesterGrade: number;
  secondSemesterCreditUnit: number;
  secondSemesterGrade: number;
  studentStatus?: string;
  createdAt?: string;
}

export default StudentInfo;
