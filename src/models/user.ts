import DB from '../config/database';
import { User } from '../utils/interface/user';
import AppError from '../utils/errors/appError';

class UserStore {
  async getUserById(id: number): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users WHERE id =($1)';
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows;
      return user;
    } catch (err) {
      throw new AppError(`Cannot find this User with id: Err ${err}.`, 400);
    }
  }
}

export default UserStore;
