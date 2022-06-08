/* eslint-disable no-template-curly-in-string */
import supertest from 'supertest';
import app from '../../server';
import { User } from '../../utils/interface/user';
import {Request, Response} from "express"

const request = supertest(app);

describe('User Handler', () => {
  let originalTimeout: number;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('Request /api/v1/user/${id} to be return 200', (done) => {
    request.get('/api/v1/users/17').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.success).toBeFalsy();
      done();
    });
  });

  it('Request /api/v1/user/:id should not return an array of a single user', async () => {
    const response = await supertest(app);
    const result = await response
      .get('/api/v1/user/17')
      .set('Accept', 'application/json');
    expect(result.status).toBe(404);
    expect(result.body.status).toEqual('fail');
    expect(result.type).toEqual('application/json');
  });

  
});
