import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Routes', () => {
  it('should update a user /api/v1/users/17', (done) => {
    request.patch(`/api/v1/users/17`).then((res) => {
      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });
  it('Update users /api/v1/user/:id should not return an array of a single user', async () => {
    const response = await supertest(app);
    const result = await response
      .get('/api/v1/user/19')
      .set('Accept', 'application/json');
    expect(result.status).toBe(404);
    expect(result.body.status).toEqual('fail');
    expect(result.type).toEqual('application/json');
  });

  it('update user routes to expect bad request', async () => {
    await request
      .patch(`/api/v1/users/17`)
      .set('Accept', 'application/json')
      .send({ email: 'emmanuel@gmail.com' })
      .expect(400);
  });
});
