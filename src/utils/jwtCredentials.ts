import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const secret = process.env.TOKEN_SECRET as string;
export const expiresIn = process.env.JWT_EXPIRES_IN;
export const jwtCookiesExpiresIn = parseInt(
  process.env.JWT_COOKIES_EXPIRES_IN as string,
  10
);

export const signToken = (id: number) => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};
