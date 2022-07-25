import csvtojson from 'csvtojson';
// import { StudentInfo } from './interface/studentInfo';

const fileConverter = async (csvFilePath: string) => {
  const convertedFile = await csvtojson().fromFile(csvFilePath);
  const data = convertedFile.slice(0, 4);
  return data;
};

export default fileConverter;
