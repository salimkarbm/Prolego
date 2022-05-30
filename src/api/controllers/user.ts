/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { UserStore } from '../../model/user';

const users = new UserStore();

const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUser = await users.getUsers();
    res.status(200).json({
      status: 'Success',
      message: 'User has been found',
      data: allUser,
    });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

export default getAllUser;
