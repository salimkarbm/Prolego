export type User = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password_digest: string;
  role?: string;
};

export default User;
