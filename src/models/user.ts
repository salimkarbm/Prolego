/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import DB from '../config/database';
import { User } from '../utils/interface/user';
import { pepper, saltRound } from '../utils/bcryptCredentials';

export class UserStore {
  async updateUser(user: User, id: string): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = `UPDATE users SET email = ($1), firstname = ($2), lastname = ($3), password_digest = ($4) WHERE id = ${id} RETURNING *`;
      const hash = await bcrypt.hash(user.password + pepper, saltRound);

      const values: (string | undefined)[] = [
        user.email,
        user.firstname,
        user.lastname,
        hash,
      ];
      const result = await conn.query(sql, values);
      const users = result.rows[0];
      conn.release();
      return users;
    } catch (error) {
      throw new Error(
        `could not update users ${user.email}. Not Found: ${error}`
      );
    }
  }
}
