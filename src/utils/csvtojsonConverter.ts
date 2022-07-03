import csvtojson from 'csvtojson';
import path from 'path';
import AppError from './errors/appError';
// import StudentInfo from './interface/studentInfo';

const cwd = process.cwd();
const csvFilePath = path.join(`${cwd}/data/studentsInfo.csv`);

const fileConverter = async () => {
  if (!csvFilePath) {
    return new AppError('cannot find path to file', 404);
  }
  if (!(path.extname(csvFilePath) === '.csv')) {
    return new AppError('this is not a valid CSV file', 400);
  }
  const convertedFile = await csvtojson().fromFile(csvFilePath);
  const data = convertedFile.slice(0, 20);
  return data;
};

export default fileConverter;
