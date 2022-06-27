interface StudentInfo {
  field: number;
  firstName?: string;
  lastName?: string;
  course: number;
  attendance: number;
  gender: number;
  ageAtEnrollment: number;
  nationality: number;
  maritalStatus: number;
  prevQualification: number;
  prevQualificationGrade: number;
  motherQualification: number;
  tuitionFee: number;
  fatherQualification: number;
  admissionGrade: number;
  schorlarship: number;
  firstSemesterCreditUnit: number;
  firstSemesterApproved: number;
  firstSemesterGrade: number;
  secondSemesterCreditUnit: number;
  secondSemesterApproved: number;
  secondSemesterGrade: number;
  studentStatus?: string;
  createdAt?: string;
}

export default StudentInfo;
