import bcrypt from 'bcrypt'
import DB from '../config/database';
import { User, UpdateUser } from '../utils/interface/user';
import AppError from '../utils/errors/appError';
import { pepper, saltRound } from '../utils/bcryptCredentials';

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
      throw new AppError(`Unable to find user with id:${id}.`, 400);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await DB.client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new AppError(`unable to fetch users from database`, 400);
    }
  }

  async forgotPassword(
    email: string,
    passwordResetToken: string
  ): Promise<UpdateUser[]> {
    try {
      const conn = await DB.client.connect();
      const sql =
        'UPDATE users SET passwordResetToken = ($1) WHERE email = ($2) RETURNING *';
      const values = [email, passwordResetToken];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new AppError(`Unable to get user from the database`, 400);
    }
  }
  // async ResetPassword(email: string, token: UpdateUser['verificationToken'], password: string): Promise<UpdateUser[]>{
  //   try {
  //     const conn = await DB.client.connect();
  //     const values = [email]
  //     const sql = 'SELECT * FROM users WHERE email =$1'
  //     const result = await conn.query(sql, values)
  //     const tokenchecker = result.rows[0]
  //     if (tokenchecker === token){
  //       sql = 'UPDATE users SET password =($1) WHERE email =($2) RETURNING *';
  //       const hash = bcypt.hash(password + pepper, saltRound)
  //     }
  //   } catch (err) {
  //     throw new AppError('Unable to ', 500);
  //   }
  // }
}

export default UserStore;
