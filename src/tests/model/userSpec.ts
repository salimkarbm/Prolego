import { UserStore } from '../../model/user';

const users = new UserStore();

describe('User model', () => {
  it('should have getall method', () => {
    expect(users.destroy).toBeDefined();
  });
});
