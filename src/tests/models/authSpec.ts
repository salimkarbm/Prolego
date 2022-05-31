import AuthService from '../../services/authentication';
import User from '../../utils/interface/user';

const store = new AuthService();

describe('Test users model', () => {
  let user: User;
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('create method should add a user', async () => {
    user = await store.create({
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
    user = await store.create({
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
  it('password input should be at least 5 characters', async () => {
    user = await store.create({
      firstname: 'one',
      lastname: 'two',
      email: 'two@example.com',
      password: 'pass',
    });
    expect(user.password).toBeFalsy();
  });
  it('should have an checkEmail method', () => {
    expect(store.checkEmail).toBeDefined();
  });
});
