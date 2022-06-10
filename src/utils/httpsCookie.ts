import { Request, Response } from 'express';
import { jwtCookiesExpiresIn, signToken } from './jwtCredentials';

import { User } from './interface/user';

const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const id = Number(user.id);
  if (id) {
    const token = signToken(id);
    const cookieOptions = {
      expires: new Date(Date.now() + jwtCookiesExpiresIn * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createAt: user.created_at,
      },
    });
  }
};

export default createSendToken;
