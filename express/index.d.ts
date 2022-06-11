import { User } from '../src/utils/interface/user';

declare global {
  declare namespace Express {
    interface Request {
      user: User;
    }
  }
}
