import client from '../config/database';

describe('Test Database connection ', () => {
  it('it expects database to be connected', async (): Promise<void> => {
    await expectAsync(client.connect()).toBeResolved();
  });
});
