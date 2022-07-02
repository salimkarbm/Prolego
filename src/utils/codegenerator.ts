const codeGenerator = (number: number): string | undefined => {
  return Math.random().toString(number).slice(2);
};

export default codeGenerator;
