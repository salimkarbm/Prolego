export interface StudentInfo {
  id?: string;
  matno: string;
  firstname?: string;
  lastname?: string;
  course: number;
  attendance: number;
  gender: number;
  ageatenrollment: number;
  region: number;
  maritalstatus: number;
  prevqualification: number;
  prevqualificationgrade: number;
  motherqualification: number;
  tuitionfee: number;
  fatherqualification: number;
  admissiongrade: number;
  schorlarship: number;
  firstsemestercreditunit: number;
  firstsemestergrade: number;
  secondsemestercreditunit: number;
  secondsemestergrade: number;
  studentstatus?: string;
  createdat?: string;
}

export interface StudentCount {
  count: number;
}
export interface Courses {
  course: string;
}
export interface TopStudents {
  firstname: string;
  lastname: string;
  firstsemestergrade: number;
  secondsemestergrade: number;
  totalgrade: number;
}
export const courses = new Map()
  .set('management', 11)
  .set('social service', 8)
  .set('information technology', 9)
  .set('economics', 5)
  .set('accounting', 14)
  .set('agronomy', 13)
  .set('design', 16)
  .set('education', 10)
  .set('nursing', 4)
  .set('journalism', 1)
  .set('chemistry', 2)
  .set('law', 3)
  .set('business', 15)
  .set('finance', 6)
  .set('biology', 7)
  .set('philosophy', 12)
  .set('mechanical engineering', 0);

export const region = new Map()
  .set('south west', 4)
  .set('south east', 3)
  .set('south south', 2)
  .set('north central', 1)
  .set('north east', 0)
  .set('north west', 5);

export const motherQua = new Map()
  .set('SSCE', 4)
  .set('others', 5)
  .set('BSC', 0)
  .set('PHD', 3)
  .set('HND', 1)
  .set('MSC', 2);

export const fatherQua = new Map()
  .set('SSCE', 4)
  .set('others', 5)
  .set('BSC', 0)
  .set('PHD', 3)
  .set('HND', 1)
  .set('MSC', 2);
