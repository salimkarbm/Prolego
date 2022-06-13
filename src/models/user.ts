import DB from '../config/database';
import { User } from '../utils/interface/user';
import AppError from '../utils/errors/appError';

console.log(DB.client.connect());
class UserStore {
  async getAllUsers(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      const getuser = result.rows;
      conn.release();
      return getuser;
    } catch (err) {
      throw new AppError(`Unable find User ${err}`, 400);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id =($1)';
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new AppError(`Unable to find user with id:${id}.`, 400);
    }
  }
}

export default UserStore;
