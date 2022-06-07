import DB from '../config/database';
import { User } from '../utils/interface/user';
import AppError from '../utils/errors/appError';

class UserStore {
  async forgotpassword(id: number, email: string): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `UPADTE password SET email = ($1) WHERE id = ($2) `;
      const result = await conn.query(sql, [id, email]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`can not send passwor to this email`, 400);
    }
  }
}

export default UserStore;
