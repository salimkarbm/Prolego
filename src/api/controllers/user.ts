/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import UserStore from '../../models/user';
import { User } from '../../utils/interface/user';
import AppError from '../../utils/errors/appError';
import { expiresIn, secret } from '../../utils/jwtCredentials';
import sendEmail from '../../utils/sendEmail';

const users = new UserStore();

// const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.body.email) {
//       return next(new AppError('fill in the correct email ', 400));
//     }

//     const user: User = {
//       email: req.body.email,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       password: req.body.password,
//     };
//     const updatedUser = await users.updateUser(user, req.params.id);
//     res.status(200).json({
//       status: 'Success',
//       message: 'The userprofile has been successfully updated',
//       data: updatedUser,
//     });
//   } catch (err) {
//     return res.status(404).json(err);
//   }
// };

// export default updateUsers;

const forgotemailpassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return next(err);
  }

  try {
    if (!req.body.email) {
      return next(new AppError('email does not exist', 409));
    }
    const emailId = await users.forgotpassword(req.body.email, req.params.id);
   
    // const url = `${process.env.POSTGRES_HOST}password-reset/${emailId}/${tokenSign}`;
    await sendEmail();
    res.status(200).json({
      status: 'success',
      message: 'password reset link sent to your link',
      data: emailId,
    });
    res.status(202).json({});
  } catch (err) {
    return next(err);
  }
};

export default forgotemailpassword;
