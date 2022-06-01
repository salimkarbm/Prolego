import AuthService from '../../services/authentication';
import { User } from '../../utils/interface/user';

const authStore = new AuthService();

describe('Test users model', () => {
  let user: User;
  it('should have a create method', () => {
    expect(authStore.create).toBeDefined();
  });
  it('create method should add a user', async () => {
    user = await authStore.create({
      firstname: 'userOne',
      lastname: 'One',
      email: 'user@example.com',
      password: 'pass112',
    });
    expect(user.email).toEqual('user@example.com');
    expect(user.firstname).toEqual('userOne');
    expect(user.lastname).toEqual('One');
  });
  it('create method input should not be empty', async () => {
    user = await authStore.create({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
    expect(user.email).toBeFalsy();
    expect(user.firstname).toBeFalsy();
    expect(user.lastname).toBeFalsy();
    expect(user.password).toBeFalsy();
  });
  it('password should be at least 5 characters', async () => {
    user = await authStore.create({
      firstname: 'one',
      lastname: 'two',
      email: 'two@example.com',
      password: 'pass',
    });
    expect(user.password).toBeFalsy();
  });
  it('should have a checkEmail method and return email not found if email does not exist', async () => {
    const result = await authStore.checkEmail('email not found');
    expect(authStore.checkEmail).toBeDefined();
    expect(result).toBeFalsy();
  });
  it('should have a checkEmail method and return true if email exist', async () => {
    const result = await authStore.checkEmail('user@example.com');
    expect(authStore.checkEmail).toBeDefined();
    expect(result).toBeTruthy();
  });
  it('authenticate method should validate the user', async () => {
    const result = await authStore.authenticate('user@example.com', 'pass112');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.email).toEqual('user@example.com');
    }
  });
  it('authenticate method should reject the user', async () => {
    const result = await authStore.authenticate('userEmail', 'invalidpassword');
    expect(result).toBeNull();
  });
});
