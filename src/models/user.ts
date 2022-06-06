import DB from '../config/database';
import { User } from '../utils/interface/user';
import AppError from '../utils/errors/appError';

class UserStore {
  async updateUser(user: User, id: string): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `UPDATE users SET firstname = ($1), lastname = ($2), password_digest = ($3), email = ($4) WHERE id = '${id}' RETURNING *`;
      const values: (string | undefined)[] = [
        user.firstname,
        user.lastname,
        user.password,
        user.email
      ];
      const result = await conn.query(sql, values);
      const users = result.rows[0];
      console.log(result, 'yeah');
      conn.release();
      return users;
    } catch (error) {
      throw new AppError(`could not update user ${user.email}`, 400);
    }
  }
}

export default UserStore;
