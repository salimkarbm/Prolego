/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../config/database';

export type User = {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);

export class UserStore {
  async getUser(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      console.log(result);
      const user = result.rows;
      return user;
    } catch (error) {
      throw new Error(`Can't find User`);
    }
  }

  async getUserById(id: number): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users where id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      const userId = result.rows;
      return userId;
    } catch (error) {
      throw new Error(`Can't find User with this ${id}`);
    }
  }

  async createUser(user: User): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      const result = await conn.query(sql, [
        user.email,
        user.firstname,
        user.lastname,
        hash,
      ]);
      conn.release();
      const createdUser = result.rows;
      return createdUser;
    } catch (error) {
      throw new Error(
        `Could not add new user ${user.firstname}. Error: ${error}`
      );
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE username =($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const passDigest = result.rows[0];
        if (bcrypt.compareSync(password + pepper, passDigest)) {
          const sqlz = 'SELECT * FROM users WHERE username = ($1)';
          const Userauth = await conn.query(sqlz, [username]);
          return Userauth.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Can not authenticate User ${error}`);
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return !result;
    } catch (error) {
      throw new Error(`unable delete user (${id}): ${error}`);
    }
  }
}
