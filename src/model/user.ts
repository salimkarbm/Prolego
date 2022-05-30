import DB from '../config/database';
import User from '../utils/interface/user';

export class UserStore {
  async getUserById(id: number): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users WHERE id =($1)';
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows;
      return user;
    } catch (error) {
      throw new Error(`Cannot find this User with id: ${id}, Error ${error}.`);
    }
  }
}
