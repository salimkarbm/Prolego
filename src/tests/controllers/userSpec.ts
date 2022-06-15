import supertest from 'supertest';
import server from '../../server';

describe('User Handler', () => {
  let originalTimeout: number;
  const request = supertest(server);

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  it('should require on GET /api/v1/users', (done) => {
    request.get('/api/v1/users').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  it('Request /api/v1/user/: id to return a single user', (done) => {
    request.get('/api/v1/users/1').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual('success');
      done();
    });
  });

  it('should return all users', async () => {
    const response = await request.get('/api/v1/users');
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('Request /api/v1/user/:id should not return false', async () => {
    const response = await supertest(server);
    const result = await response
      .get('/api/v1/user/17')
      .set('Accept', 'application/json');
    expect(result.status).toBe(404);
    expect(result.body.status).toEqual('fail');
    expect(result.type).toEqual('application/json');
  });
  it('index endpoint should return all of the users', async () => {
    const response = await request
      .get('/api/v1/users')
      .set('Accept', 'application/json');
    expect(response.body.status).toEqual('success');
    expect(response.body.data.allUser).toEqual([]);
  });
});
