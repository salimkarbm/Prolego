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
  fit('should have a index method', async () => {
    const result = await store.index();
    expect(store.index).toBeDefined();
    expect(result).toBeInstanceOf(Array);
  });
});
