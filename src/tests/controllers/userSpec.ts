import supertest from 'supertest';
import app from '../../server';
import { User } from '../../utils/interface/user';

const request = supertest(app);

describe('User Routes', () => {
  fit('should require on GET /users', (done) => {
    request.get('/api/v1/users').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  fit('should return all users', async () => {
    const response = await request.get('/api/v1/users');
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
