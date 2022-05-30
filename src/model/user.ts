/* eslint-disable import/prefer-default-export */

import { User } from '../utils/interface/user';
import DB from '../config/database';

export class UserStore {
  async getUsers(): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      const getuser = result.rows;
      return getuser;
    } catch (error) {
      throw new Error(`Cannot find User ${error}`);
    }
  }
}
