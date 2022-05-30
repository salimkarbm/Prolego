import { UserStore } from '../../model/user';

const users = new UserStore();

describe('test', () => {
  it('it should have a getUser', () => {
    expect(users.getUserById).toBeDefined();
  });
});
