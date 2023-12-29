const request = require('supertest');
const app = require('../../app');
const { httpGetAllPersons } = require('./person.controller');

let token = '';

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/user/login')
    .send({ username: 'admin1', password: 'Hola1234' });

  token = loginResponse.body.response['token'];
});

jest.mock('../../services/person.service.js', () => ({
  getAllPersons: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({
        status: 401,
        response: { message: 'Unauthorized. Needs to be logged in' }
      })
    )
    .mockImplementation(() => Promise.resolve({ status: 200, response: {} }))
    .mockImplementation(() =>
      Promise.resolve({ status: 404, response: { error: 'Persons not found' } })
    )
    .mockImplementation(() =>
      Promise.resolve({ status: 500, response: { error: '' } })
    )
}));

app.get('/person', httpGetAllPersons);

describe('GET /person', () => {
  it('Responds with 401 for unauthorized acces', async () => {
    const response = await request(app).get('/person');
    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      message: 'Unauthorized. Needs to be logged in'
    });
  });

  it('Responds with 200 for authorized access & retrieve all persons', async () => {
    const response = await request(app)
      .get('/person')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      response: {}
    });
  });

  it('Responds with 404 if persons not found', async () => {
    const response = await request(app)
      .get('/person')
      .set('Authorization', token);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      status: 404,
      response: { error: 'Persons not found' }
    });
  });

  it('Responds with 500 if error', async () => {
    const response = await request(app)
      .get('/person')
      .set('Authorization', token);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      status: 500,
      response: { error: '' }
    });
  });
});
