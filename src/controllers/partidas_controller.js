import * as partidasModel from "../models/partidas_model.js";

export const listar = async (req, res) => {
    try {
        const [partidas] = await partidasModel.listar();
        res.json(partidas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro ao listar partidas" });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [partida] = await partidasModel.buscarPorId(id);

        if (partida.length === 0) {
            return res.status(404).json({ msg: "Partida não encontrada" });
        }

        res.json(partida[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro ao buscar partida" });
    }
};

export const criar = async (req, res) => {
    try {
        const { jogo_id, player_id, pontos } = req.body;

        const data_partida = new Date();

        const [resultado] = await partidasModel.criar(
            jogo_id,
            player_id,
            pontos,
            data_partida
        );

        res.status(201).json({
            msg: "Partida criada",
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro ao criar partida" });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { jogo_id, player_id, pontos } = req.body;

        const [resultado] = await partidasModel.atualizar(id, jogo_id, player_id, pontos);

        // ✅ ADICIONADO
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Partida não encontrada" });
        }

        res.json({ msg: "Atualizado com sucesso" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro ao atualizar partida" });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await partidasModel.deletar(id);

        // ✅ ADICIONADO
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Partida não encontrada" });
        }

        res.json({ msg: "Partida removida com sucesso" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro ao deletar partida" });
    }
};