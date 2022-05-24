import { Request, Response } from 'express';
import { UserStore } from '../models/user';

const users = new UserStore();

const getUser = async (req: Request, res: Response) => {
  try {
    const user = users.getUser();
    res.status(200).json({
      Status: 'success',
      Message: 'User has been found',
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: 'User does not exist' });
  }
};
