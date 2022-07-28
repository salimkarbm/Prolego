import supertest from 'supertest';
import server from '../../server';
import { User } from '../../utils/interface/user';

describe('Test users endpoints', () => {
  const request = supertest(server);
  beforeAll(async () => {
    await request
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        firstname: 'user2',
        lastname: 'user2',
        email: 'imuzaidynasty@gmail.com',
        password: 'pass1234',
      });
  });
  describe('', () => {
    let originalTimeout: number;
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    const newUser: User = {
      firstname: 'user',
      lastname: 'user',
      password_digest: 'pass1234',
      email: 'user2@example.com',
    };
    it('/api/v1/signup endpoint should create a user', async () => {
      const result = await request
        .post('/api/v1/signup')
        .set('Accept', 'application/json')
        .send({
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          password: newUser.password_digest,
        });
      expect(result.body.status).toEqual('success');
      expect(result.type).toEqual('application/json');
    });
    it('/api/v1/login endpoint should login the users', async () => {
      const result = await request
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send({
          email: 'imuzaidynasty@gmail.com',
          password: 'pass1234',
        });
      expect(result.body.status).toEqual('success');
      expect(result.type).toEqual('application/json');
      expect(result.body.token).toBeInstanceOf(String);
    });
    it('/api/v1/users-email endpoint should get users by email', async () => {
      const result = await request
        .get('/api/v1/users-email')
        .set('Accept', 'application/json')
        .send({
          email: 'imuzaidynasty@gmail.com',
        });
      expect(result.body.status).toEqual('success');
      expect(result.status).toEqual(200);
      expect(result.type).toEqual('application/json');
      expect(result.body.data.email).toEqual('imuzaidynasty@gmail.com');
    });
    it('/api/v1/users/forgotpassword endpoint should send an Email', async () => {
      const result = await request
        .post('/api/v1/users/forgotpassword')
        .set('Accept', 'application/json')
        .send({
          email: 'imuzaidynasty@gmail.com',
        });
      expect(result.status).toEqual(200);
      expect(result.type).toEqual('application/json');
    });
  });
});
