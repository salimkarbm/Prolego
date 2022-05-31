/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { UserStore } from '../../model/user';
import User from '../../utils/interface/user';

const users = new UserStore();

const updateUsers = async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      return res.status(404).json({
        error: 'Fill in the right User',
      });
    }

    const user: User = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const updatedUser = await users.updateUser(user, req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'The users has been successfully updated',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default updateUsers;
