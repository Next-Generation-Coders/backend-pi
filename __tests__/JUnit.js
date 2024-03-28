const request = require('supertest');
const app = require('../app.js'); 

describe('GET /', () => {
  it('responds with 200', async () => {
    const response = await request(app).get('/User/getall');
    expect(response.statusCode).toBe(401);
  });
});
