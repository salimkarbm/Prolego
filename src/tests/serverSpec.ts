import supertest from 'supertest';

import app from '../server';

describe('Test server', () => {
  it('it expects server to be running', async (): Promise<void> => {
    const request = supertest(app);
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
});
