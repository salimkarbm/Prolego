export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role?: string;
  active?: boolean;
  created_at?: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface jwtToken {
  id: number;
  iat: number;
  exp: number;
}
export interface UpdateUser {
  id?: number;
  email: string;
  password: string;
  createPasswordToken?: string;
  password_Confirmation?: string;
}

export interface GoogleUser extends User {
  google_id: string;
}
