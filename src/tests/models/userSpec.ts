import { UserStore } from '../../models/user';

const users = new UserStore();

describe('User model', () => {
  it('should have getall method', () => {
    expect(users.updateUser).toBeDefined();
  });
  it('should update a user', async () => {
    const result = await users.updateUser(
      {
        email: 'emmanuel@gmail.com',
        firstname: 'jack',
        lastname: 'trip',
        password: 'uiurir',
      },
      '17'
    );
    expect(result).toBeTruthy();
  });
});
