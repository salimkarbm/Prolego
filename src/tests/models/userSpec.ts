import UserStore from '../../models/user';

const users = new UserStore();

describe('test', () => {
  fit('it should have a getUser', () => {
    expect(users.getUserById).toBeDefined();
  });

  fit('getUserById method should return the correct user', async () => {
    const id = 18;
    const result = await users.getUserById(id);
    console.log(result);
    expect(result).toBeDefined();
  });
  fit('getUserById should return this user', async () => {
    const result = users.getUserById(2);
    expect(users.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });
});
