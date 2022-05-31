import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Routes', () => {
  let userId: number;
  // eslint-disable-next-line no-template-curly-in-string
  it('should update a user /users/${id}', (done) => {
    request.delete(`/api/v1/users/${userId}`).then((res) => {
      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });
});
