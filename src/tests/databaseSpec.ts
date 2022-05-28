import DB from '../config/database';

describe('Test Database connection ', () => {
  it('it expects database to be connected', async (): Promise<void> => {
    await expectAsync(DB.client.connect()).toBeResolved();
  });
});
