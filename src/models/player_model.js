import * as db from '../config/db.js';

export async function listar() {
    const [jogadores] = await db.conexao.query("SELECT * FROM jogadores");
    return jogadores;
}

export async function buscarPorId(id) {
    const [jogador] = await db.conexao.query("SELECT * FROM jogadores WHERE id = ?", [id]);
    return jogador;
}

export async function criar({ nome, idade, posicao }) {
    const [resultado] = await db.conexao.query(
        "INSERT INTO jogadores (nome, idade, posicao) VALUES (?, ?, ?)",
        [nome, idade, posicao]
    );
    return {
        id: resultado.insertId,
        nome,
        idade,
        posicao
    };
}