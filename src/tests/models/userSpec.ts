import UserStore from '../../models/user';

const store = new UserStore();

describe('test', () => {
  it('it should have a getUserById method', () => {
    expect(store.getUserById).toBeDefined();
  });

  it('getUserById  method should return a user', async () => {
    const id = 1;
    const result = await store.getUserById(id);
    expect(store.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });
  it('should have a index method', async () => {
    const result = await store.index();
    expect(store.index).toBeDefined();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have a getUserbyEmail method', async () => {
    const result = await store.getUserByEmail('user@example.com');
    expect(result.email).toEqual('user@example.com');
    expect(store.getUserByEmail).toBeDefined();
  });
});
