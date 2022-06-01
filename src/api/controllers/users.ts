import { Request, Response } from 'express';
import UserStore from '../../models/user';

const users = new UserStore();

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = await users.getUserById(id);
    if (userId.length === 0)
      return res.status(404).json({ message: 'user not found' });
    const response = {
      status: 'success',
      statusCode: 200,
      response: userId,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default getUserById;
