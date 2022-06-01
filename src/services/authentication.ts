import bcrypt from 'bcrypt';
import DB from '../config/database';
import User from '../utils/interface/user';
import AppError from '../utils/errors/appError';
import { pepper, saltRound } from '../utils/bcryptCredentials';

class AuthService {
  async create(user: User): Promise<User> {
    const newUser = {
      firstName: user.firstname,
      lastName: user.lastname,
      password: user.password,
      email: user.email,
    };
    try {
      const conn = await DB.client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest, email,roles) VALUES($1, $2, $3, $4) RETURNING * ';
      const hash = await bcrypt.hash(newUser.password + pepper, saltRound);

      const result = await conn.query(sql, [
        newUser.firstName,
        newUser.lastName,
        hash,
        newUser.email,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new AppError(`Unable to create user ${newUser.firstName},`, 400);
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    try {
      const sql = `SELECT * FROM users WHERE email = '${email}'`;
      const conn = await DB.client.connect();
      const result = await conn.query(sql);
      conn.release();
      return !!result.rows[0];
    } catch (err) {
      throw new AppError(`Something went wrong,`, 400);
    }
  }
}

export default AuthService;
