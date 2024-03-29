import DB from '../config/database';
import { User, GoogleUser } from '../utils/interface/user';
import AppError from '../utils/errors/appError';

class UserStore {
  async getUserById(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id =($1)';
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new AppError(`Unable to find user with id:${id}.`, 500);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [email]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new AppError(`Unable to find user with Email:${email}.`, 500);
    }
  }

  async index(): Promise<GoogleUser[]> {
    try {
      const conn = await DB.client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`unable to fetch users from database`, 500);
    }
  }

  async update(id: number, password: string): Promise<User> {
    try {
      const sql = `UPDATE users SET password_digest=($1) WHERE id=${id} RETURNING *`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql, [password]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new AppError(
        `Unable to update user with password:${password}.`,
        500
      );
    }
  }
}

export default UserStore;
