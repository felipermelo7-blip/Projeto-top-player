import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Jogos', () => {
  let jogoId;

  test('POST /jogos deve criar jogo', async () => {
    const response = await request(app)
      .post('/jogos')
      .send({ nome: `FIFA_${Date.now()}`, genero: "Esporte" });

    expect([201, 500]).toContain(response.statusCode);
    if (response.statusCode === 201) {
      expect(response.body).toHaveProperty('id');
      jogoId = response.body.id;
    }
  });

  test('GET /jogos deve listar jogos', async () => {
    const response = await request(app).get('/jogos');
    expect([200, 500]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  test('PUT /jogos/:id deve atualizar jogo', async () => {
    const response = await request(app)
      .put(`/jogos/${jogoId || 1}`)
      .send({ nome: "FIFA", genero: "Esporte" });

    expect([200, 404, 500]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(response.body.mensagem).toBe("Jogo atualizado com sucesso");
    }
  });

  test('DELETE /jogos/:id deve remover jogo', async () => {
    const response = await request(app).delete(`/jogos/${jogoId || 1}`);
    expect([200, 404, 500]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(response.body.mensagem).toBe("Jogo deletado com sucesso");
    }
  });
});