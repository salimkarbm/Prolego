/* create students_info table */
CREATE TABLE students_info (
  id  serial PRIMARY KEY,
  firstName varchar(50) ,
  lastName varchar(50),
  course varchar(50) NOT NULL,
  attendance varchar(50) NOT NULL,
  gender varchar(20) NOT NULL,
  ageAtEnrollment varchar(20) NOT NULL,
  region varchar(50) NOT NULL,
  maritalStatus varchar(50) NOT NULL,
  prevQualification varchar(100) NOT NULL,
  prevQualificationGrade varchar(100) NOT NULL,
  motherQualification varchar(100) NOT NULL,
  tuitionFee varchar(100) NOT NULL,
  fatherQualification varchar(50) NOT NULL,
  admissionGrade varchar(50) NOT NULL,
  schorlarship varchar(50) NOT NULL,
  firstSemesterCreditUnit varchar(50) NOT NULL,
  firstSemesterGrade DOUBLE PRECISION NOT NULL,
  secondSemesterCreditUnit varchar(50) NOT NULL,
  secondSemesterGrade DOUBLE PRECISION NOT NULL,
  studentStatus varchar(50),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
  
  
  
  