import UserStore from '../../models/user';

const users = new UserStore();

describe('User model', () => {
  fit('should have getall method', () => {
    expect(users.getUsers).toBeDefined();
  });

  fit('should return the specific number of users', async () => {
    const result = await users.getUsers();
    expect(result.length).toEqual(12);
  });

  fit('should prove users are more than 0', async () => {
    const result = await users.getUsers();
    expect(result.length).toBeGreaterThan(0);
  });
});
