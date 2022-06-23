import supertest from 'supertest';
import server from '../../server';

describe('Test users endpoints', () => {
  let originalTimeout: number;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('/api/v1/signup endpoint should create a user', async () => {
    const request = supertest(server);
    const result = await request
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        firstname: 'UserOne',
        lastname: 'User',
        email: 'user@example.com',
        password: 'pass1',
      });
    expect(result.body.status).toEqual('success');
    expect(result.type).toEqual('application/json');
  });
  it('/api/v1/login endpoint should login the users', async () => {
    const request = supertest(server);
    const result = await request
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send({
        email: 'user@example.com',
        password: 'pass112',
      });
    expect(result.body.status).toEqual('success');
    expect(result.type).toEqual('application/json');
    expect(result.body.token).toBeInstanceOf(String);
  });
  it('/api/v1/users-email endpoint should get users by email', async () => {
    const request = supertest(server);
    const result = await request
      .get('/api/v1/users-email')
      .set('Accept', 'application/json')
      .send({
        email: 'user@example.com',
      });
    expect(result.body.status).toEqual('success');
    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
    expect(result.body.data.email).toEqual('user@example.com');
  });

  it('/api/v1/users/forgotpassword endpoint should send a mail', async () => {
    const request = supertest(server);
    const result = await request
      .post('/api/v1/users/forgotpassword')
      .set('Accept', 'application/json')
      .send({
        email: 'user@example.com',
      });
    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
  });
});
