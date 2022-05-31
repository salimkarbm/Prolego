import User from '../utils/interface/user';
import DB from '../config/database';

export class UserStore {
  async destroy(id: number): Promise<boolean> {
    try {
      const conn = await DB.client.connect();
      const sql = 'DELETE FROM users WHERE id =($1)';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return !!user;
    } catch (error) {
      throw new Error(`Unable to delete user with ${id}, ${error}`);
    }
  }
}
