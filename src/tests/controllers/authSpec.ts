import supertest from 'supertest';
import app from '../../server';

describe('Test users endpoints', () => {
  let originalTimeout: number;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  it('create endpoint should create a user', async () => {
    const request = supertest(app);
    const result = await request
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        firstname: 'UserOne',
        lastname: 'User',
        email: 'One@example.com',
        password: 'pass1',
      });
    expect(result.body.status).toEqual('success');
    expect(result.type).toEqual('application/json');
  });
});
