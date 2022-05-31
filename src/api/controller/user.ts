/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { UserStore } from '../../model/user';

const users = new UserStore();

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = await users.destroy(id);
    res.status(200).json({
      status: `Deleted user ${req.params.id}`,
      statusCode: 200,
      data: userId,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default deleteUser;
