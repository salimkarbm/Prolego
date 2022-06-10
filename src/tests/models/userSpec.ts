import UserStore from '../../models/user';

const users = new UserStore();

describe('test', () => {
  it('it should have a getUser', () => {
    expect(users.getUserById).toBeDefined();
  });

  it('getUserById should return this user', async () => {
    const result = users.getUserById(2);
    expect(users.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('getUserById method should return the correct user', async () => {
    const id = 18;
    const result = await users.getUserById(id);
    expect(result).toBeDefined();
  });
});
