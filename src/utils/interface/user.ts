export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  password_digest: string;
  email: string;
  role?: string;
  active?: boolean;
  created_at?: string;
  passwordresetexpires?: number;
  passwordresettoken?: string;
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
  passwordresettoken?: string;
  password_Confirmation?: string;
}

export interface GoogleUser extends User {
  google_id: string;
}

export interface resetUser {
  email: string;
  subject: string;
  message: string;
}

export interface ResetPassword {
  passwordResetToken: string;
  passwordResetExpires: number;
}
