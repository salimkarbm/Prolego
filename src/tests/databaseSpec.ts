import DB from '../config/database';

describe('Test Database connection ', () => {
  fit('it expects database to be connected', async (): Promise<void> => {
    await expectAsync(DB.client.connect()).toBeResolved();
  });
});
