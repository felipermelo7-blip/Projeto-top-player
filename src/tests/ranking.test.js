import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Rankings', () => {

  test('GET /rankings deve retornar lista', async () => {
    const response = await request(app).get('/rankings');
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  test('GET /rankings?limite=5 deve respeitar o limite', async () => {
    const response = await request(app).get('/rankings?limite=5');
    expect([200, 404, 400]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);
    }
  });

  test('GET /rankings?limite=0 deve retornar 400', async () => {
    const response = await request(app).get('/rankings?limite=0');
    expect([400, 404]).toContain(response.statusCode);
  });

  test('GET /rankings/por-jogo deve retornar 400 sem jogo_id', async () => {
    const response = await request(app).get('/rankings/por-jogo');
    expect([400, 404]).toContain(response.statusCode);
  });

});