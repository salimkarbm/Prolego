import UserStore from '../../models/user';

const store = new UserStore();

describe('Test user model', () => {
  it('it should have a getUserById method', () => {
    expect(store.getUserById).toBeDefined();
  });

  it('getUserById method should return a user', async () => {
    const id = 1;
    const result = await store.getUserById(id);
    expect(store.getUserById).toBeDefined();
    expect(result).toBeTruthy();
  });
  it('should have an index method', async () => {
    const result = await store.index();
    expect(store.index).toBeDefined();
    expect(result).toBeInstanceOf(Array);
  });
  it('should have a getUserbyEmail method', async () => {
    const result = await store.getUserByEmail('admin@example.com');
    expect(result.email).toEqual('admin@example.com');
    expect(store.getUserByEmail).toBeDefined();
  });
  it('it should have update method', () => {
    expect(store.update).toBeDefined();
  });
});
