import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Partidas', () => {
    let jogoId;
    let playerId;
    let partidaId;

    beforeAll(async () => {
        const jogoRes = await request(app)
            .post('/jogos')
            .send({ nome: `Jogo Teste Partida ${Date.now()}`, genero: "Acao" });

        jogoId = jogoRes.body.id;

        const playerRes = await request(app)
            .post('/players')
            .send({ nickname: `playerTeste${Date.now()}`, plataforma: "PC" });

        playerId = playerRes.body.id;
    });

    afterAll(async () => {
        await request(app).delete(`/jogos/${jogoId}`);
        await request(app).delete(`/players/${playerId}`);
    });

    test('POST /partidas deve criar partida', async () => {
        const response = await request(app)
            .post('/partidas')
            .send({ jogo_id: jogoId, player_id: playerId, pontos: 100 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

        partidaId = response.body.id;
    });

    test('GET /partidas deve listar partidas', async () => {
        const response = await request(app).get('/partidas');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('DELETE /partidas/:id deve remover partida', async () => {
        const response = await request(app)
            .delete(`/partidas/${partidaId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Partida removida com sucesso");
    });

    test('DELETE /partidas/:id deve retornar 404 para id inexistente', async () => {
        const response = await request(app)
            .delete('/partidas/999999');

        expect(response.statusCode).toBe(404);
    });
});