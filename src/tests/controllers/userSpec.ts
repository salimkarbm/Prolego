import supertest from 'supertest';
// import jwt from 'jsonwebtoken';
import server from '../../server';
import { User } from '../../utils/interface/user';
// import { secret } from '../../utils/jwtCredentials';

describe('Test User controller', () => {
  const request = supertest(server);
  let accessToken: string;
  let user: User;
  beforeAll(async () => {
    await request
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        firstname: 'user3',
        lastname: 'user3',
        email: 'user3@gmail.com',
        password: 'pass1234',
      });
    const response = await request
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send({
        email: 'user3@gmail.com',
        password: 'pass1234',
      });
    const { token } = response.body;
    // const decoded = jwt.verify(token, secret) as jwtToken;
    accessToken = `Bearer ${token};`;
    user = response.body.data;
  });
  xit('/api/v1/users should  not return all users', (done) => {
    request.get('/api/v1/users').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  it('Request /api/v1/users/:id to return a single user', async () => {
    if (accessToken && user) {
      const response = await request
        .get(`/api/v1/users/${user.id as number}`)
        .set('Accept', 'application/json')
        .set('authorization', accessToken);
      expect(response.body.status).toBe(200);
      expect(response.body.status).toEqual('success');
    }
  });

  it('should return all users', async () => {
    const response = await request.get('/api/v1/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('Request /api/v1/users/:id should not return false', async () => {
    const response = await supertest(server);
    const result = await response
      .get('/api/v1/users/17')
      .set('Accept', 'application/json');
    expect(result.status).toBe(401);
    expect(result.type).toEqual('application/json');
  });
  it('index endpoint should return all of the users', async () => {
    const response = await request
      .get('/api/v1/users')
      .set('Accept', 'application/json');
    expect(response.body.status).toEqual('success');
    expect(response.body).toBeInstanceOf(Array);
  });
});
// });
