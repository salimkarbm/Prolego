import UserStore from '../../models/user';

// const users = new UserStore();

// describe('User model', () => {
//   it('should have getall method', () => {
//     expect(users.getAllUsers).toBeDefined();
//   });

//   it('should return the specific number of users', async () => {
//     const result = await users.getAllUsers();
//     expect(result.length).toEqual(12);
//   });

//   it('should prove users are more than 0', async () => {
//     const result = await users.getAllUsers();
//     expect(result.length).toBeGreaterThan(0);
//   });
//   it('should return all users', async () => {
//     const data = await users.getAllUsers();
//     expect(data).toContain(jasmine.objectContaining({}));
// })
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
});
