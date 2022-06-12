import UserStore from '../../models/user';

const users = new UserStore();

describe('test', () => {
  it('it should have a getUserById method', () => {
    expect(users.getUserById).toBeDefined();
  });

  it('getUserById  method should return a user', async () => {
    const id = 1;
    const result = await users.getUserById(id);
    expect(users.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });
});
