import UserStore from '../../models/user';

const users = new UserStore();

describe('User model', () => {
  it('should have getall method', () => {
    expect(users.updateUser).toBeDefined();
  });
});
