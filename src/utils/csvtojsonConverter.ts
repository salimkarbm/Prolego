import csvtojson from 'csvtojson';

const fileConverter = async (csvFilePath: string) => {
  const convertedFile = await csvtojson().fromFile(csvFilePath);
  const data = convertedFile.slice(0, 100);
  return data;
};

export default fileConverter;
