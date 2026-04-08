import request from 'supertest';
import app from '../app.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testes da API de Usuários', () => {
    let usuarioId;
    let emailTeste;

    test('POST /usuarios deve criar um novo usuário', async () => {
        emailTeste = `teste_${Date.now()}@exemplo.com`;

        const response = await request(app)
            .post('/usuarios')
            .send({ nome: "Fulano de Tal", email: emailTeste, senha: "senha123" });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

        usuarioId = response.body.id;
    });

    test('PUT /usuarios/:id deve atualizar um usuário existente', async () => {
        const response = await request(app)
            .put(`/usuarios/${usuarioId}`)
            .send({ nome: "Fulano Atualizado", email: emailTeste });

        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Usuário atualizado com sucesso");
    });

    test('POST /usuarios/login deve autenticar com sucesso', async () => {
        const response = await request(app)
            .post('/usuarios/login')
            .send({ email: emailTeste, senha: "senha123" });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('DELETE /usuarios/:id deve remover o usuário após um tempo', async () => {
        console.log("Aguardando 3 segundos antes de deletar...");
        await sleep(3000);

        const response = await request(app)
            .delete(`/usuarios/${usuarioId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Usuário deletado com sucesso");
    });

    test('DELETE /usuarios/:id deve retornar 404 para ID inexistente', async () => {
        const response = await request(app)
            .delete('/usuarios/999999');

        expect(response.statusCode).toBe(404);
    });
});