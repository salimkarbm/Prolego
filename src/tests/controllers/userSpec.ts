import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Routes', () => {
  it('should require on GET /api/v1/users', (done) => {
    request.get('/api/v1/users').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  it('should return all users', async () => {
    const response = await request.get('/api/v1/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
