import dotenv from 'dotenv';

dotenv.config();

export const secret = process.env.TOKEN_SECRET as string;
export const expiresIn = process.env.JWT_EXPIRES_IN;
console.log(typeof expiresIn);
