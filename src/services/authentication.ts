import bcrypt from 'bcrypt';
import DB from '../config/database';
import { User, GoogleUser } from '../utils/interface/user';
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
        'INSERT INTO users (firstname, lastname, password_digest, email) VALUES($1, $2, $3, $4) RETURNING * ';
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

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await DB.client.connect();
      const sql = `SELECT id, email, password_digest FROM users WHERE email=$1`;
      const result = await conn.query(sql, [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (await bcrypt.compare(password + pepper, user.password_digest)) {
          return user;
        }
        return null;
      }
      return null;
    } catch (err) {
      throw new AppError(`Unable to authenticate user`, 400);
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

  async upsertGoogleUser(user: GoogleUser): Promise<User> {
    const newUser = {
      firstName: user.firstname,
      lastName: user.lastname,
      password: user.password,
      email: user.email,
      googleId: user.google_id,
    };
    try {
      const conn = await DB.client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest, email, google_id) VALUES($1, $2, $3, $4,$5) RETURNING * ';
      const hash = await bcrypt.hash(newUser.password + pepper, saltRound);

      const result = await conn.query(sql, [
        newUser.firstName,
        newUser.lastName,
        hash,
        newUser.email,
        newUser.googleId,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new AppError(`Unable to upsert user ${newUser.firstName},`, 400);
    }
  }
}

export default AuthService;
