import * as db from "../config/db.js";

// LISTAR PLAYERS
export async function listar(req, res) {
    try {
        const [players] = await db.conexao.query("SELECT * FROM players");
        res.json(players);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao listar players" });
    }
}

// BUSCAR PLAYER POR ID
export async function buscarPorId(req, res) {
    try {
        const { id } = req.params;

        const [player] = await db.conexao.query(
            "SELECT * FROM players WHERE id = ?",
            [id]
        );

        // ✅ ADICIONADO
        if (player.length === 0) {
            return res.status(404).json({ erro: "Player não encontrado" });
        }

        res.json(player[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar player" });
    }
}

// CRIAR PLAYER
export async function criar(req, res) {
    try {
        const { nickname, plataforma } = req.body;

        const [resultado] = await db.conexao.query(
            "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
            [nickname, plataforma]
        );

        res.status(201).json({
            id: resultado.insertId,
            nickname,
            plataforma
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao criar player" });
    }
}

// ATUALIZAR PLAYER
export async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { nickname, plataforma } = req.body;

        const [resultado] = await db.conexao.query(
            "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?",
            [nickname, plataforma, id]
        );

        // Player não encontrado
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Player não encontrado" });
        }

        // ✅ Resposta no formato esperado pelo teste
        return res.status(200).json({
            mensagem: "Player atualizado com sucesso"
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao atualizar player"
        });
    }
}

// DELETAR PLAYER
export async function deletar(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await db.conexao.query(
            "DELETE FROM players WHERE id = ?",
            [id]
        );

        // ✅ ADICIONADO
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Player não encontrado" });
        }

        res.json({ mensagem: "Player deletado com sucesso" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao deletar player" });
    }
}