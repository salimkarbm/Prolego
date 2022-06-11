import UserStore from '../../models/user';

const users = new UserStore();

describe('User model', () => {
  it('should have getall method', () => {
    expect(users.getAllUsers).toBeDefined();
  });

  it('it should have a getUser', () => {
    expect(users.getUserById).toBeDefined();
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

  it('getUserById should return this user', async () => {
    const result = users.getUserById(1);
    expect(users.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('getUserById method should return the correct user', async () => {
    const id = 1;
    const result = await users.getUserById(id);
    expect(result).toBeDefined();
  });
});
