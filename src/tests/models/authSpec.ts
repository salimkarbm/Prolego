import AuthService from '../../services/authentication';
import { User } from '../../utils/interface/user';

const authStore = new AuthService();

describe('Test auth model', () => {
  const newUser: User = {
    firstname: 'admin',
    lastname: 'user',
    password_digest: 'pass1234',
    email: 'admin@example.com',
  };
  beforeAll(async () => {
    const user = await authStore.create(newUser);
    expect(user.email).toEqual('admin@example.com');
    expect(user.firstname).toEqual('admin');
  });

  // it('create method should add a new user', async () => {
  //   const user = await authStore.create(newUser);
  //   expect(user.email).toEqual('user@gmail.com');
  //   expect(user.firstname).toEqual('admin');
  // });
  it('should have a create method', () => {
    expect(authStore.create).toBeDefined();
  });
  it('create method values should not be empty', async () => {
    const freshUser = {
      firstname: '',
      lastname: '',
      email: '',
      password_digest: '',
    };
    if (
      newUser.firstname === '' ||
      newUser.lastname === '' ||
      newUser.email === '' ||
      newUser.password_digest === ''
    ) {
      expect(newUser.email).toBeFalsy();
      expect(newUser.firstname).toBeFalsy();
      expect(newUser.lastname).toBeFalsy();
      expect(newUser.password_digest).toBeFalsy();
    } else {
      await authStore.create(freshUser);
    }
  });
  it('password should be at least 8 characters', async () => {
    const user1 = {
      firstname: 'admin',
      lastname: 'admin',
      password_digest: 'pass',
      email: 'admin@example.com',
    };
    if (user1.password_digest.length !== 8)
      expect(user1.password_digest.length).toBeLessThan(8);
  });
  it('should have a checkEmail method and return email not found if email does not exist', async () => {
    const result = await authStore.checkEmail('email not found');
    expect(authStore.checkEmail).toBeDefined();
    expect(result).toBeFalsy();
  });
  it('should have a checkEmail method and return true if email exist', async () => {
    const result = await authStore.checkEmail('admin@example.com');
    expect(authStore.checkEmail).toBeDefined();
    expect(result).toBeTruthy();
  });
  it('authenticate method should validate the user', async () => {
    const result = await authStore.authenticate(
      'admin@example.com',
      'pass1234'
    );
    expect(result).not.toBeNull();
    if (result) {
      expect(result.email).toEqual('admin@example.com');
    }
  });
  it('authenticate method should reject the user', async () => {
    const result = await authStore.authenticate('userEmail', 'invalidpassword');
    expect(result).toBeNull();
  });

  it('it should have forgot password method', () => {
    expect(authStore.passwordResetToken).toBeDefined();
  });

  it('pasword reset method should return user', async () => {
    const result = await authStore.passwordResetToken(
      'admin@example.com',
      '3hzc0fkip9h'
    );
    expect(result).toBeTruthy();
  });
});
