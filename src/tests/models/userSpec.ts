import UserStore from '../../models/user';

const users = new UserStore();

describe('User model', () => {
  it('should have getall method', () => {
    expect(users.getAllUsers).toBeDefined();
  });

  it('should return the specific number of users', async () => {
    const result = await users.getAllUsers();
    expect(result.length).toEqual(12);
  });

  it('should prove users are more than 0', async () => {
    const result = await users.getAllUsers();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should return all users', async () => {
    const data = await users.getAllUsers();
    expect(data).toContain(jasmine.objectContaining({}));
  });
});
