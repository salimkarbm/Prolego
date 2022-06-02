/* eslint-disable no-template-curly-in-string */
import supertest from 'supertest';
import app from '../../server';
import { User } from '../../utils/interface/user';

const request = supertest(app);

describe('User Handler', () => {
  let user: User;
  let originalTimeout: number;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  fit('Request /api/v1/user/${id} to be return 200', (done) => {
    request.get('/api/v1/users/17').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  fit('Request /api/v1/user/:id should not return an array of a single user', async () => {
    const response = await supertest(app);
    const result = await response
      .get('/api/v1/user/17')
      .set('Accept', 'application/json');
    expect(result.status).toBe(404);
    expect(result.body.status).toEqual('fail');
    expect(result.type).toEqual('application/json');
  });

  it('show endpoint should return the user', async () => {
    const response = await request.get('/api/v1/users/:id').send({
      id: user.id,
    });
    expect(response.body.email).toEqual('charles@gmail.com');
    expect(response.body.firstname).toEqual('Charles');
    expect(response.body.lastname).toEqual('Onugha');
  });
});
