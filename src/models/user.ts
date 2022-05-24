/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from '../config/database';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type User = {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper: 

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
}
