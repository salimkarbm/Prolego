export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role?: string;
  active?: boolean;
  token?: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
