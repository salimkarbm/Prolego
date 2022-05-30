/* eslint-disable no-template-curly-in-string */
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Handler', () => {
  it('should require authorization on GET /user/${id}', (done) => {
    request.get('/api/v1/users/1').then((res) => {
      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });
});
