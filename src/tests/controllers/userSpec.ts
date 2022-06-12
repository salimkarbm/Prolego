/* eslint-disable no-template-curly-in-string */
import supertest from 'supertest';
import server from '../../server';

const request = supertest(server);

describe('User Handler', () => {
  let originalTimeout: number;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('Request /api/v1/user/${id} to  return a single user', (done) => {
    request.get('/api/v1/users/1').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual('success');
      done();
    });
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
});
