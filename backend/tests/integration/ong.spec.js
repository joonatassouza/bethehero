const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await database.migrate.latest();
  });

  afterAll(async () => {
    await database.migrate.rollback();
    await database.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APP',
        email: 'contato@app.com',
        whatsapp: '48985456540',
        city: 'Toledo',
        uf: 'PR'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
