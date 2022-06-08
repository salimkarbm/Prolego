import { User } from '../utils/interface/user';
import DB from '../config/database';
import AppError from '../utils/errors/appError';

class UserStore {
  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      const getuser = result.rows;
      return getuser;
    } catch (error) {
      throw new AppError(`Unable find User ${error}`, 400);
    }
  }
}

export default UserStore;
