import db from "../config/db.js";

export const listar = async (req, res) => {
  try {
    const [jogos] = await db.query("SELECT * FROM jogos");
    res.json(jogos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao listar jogos" });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [jogo] = await db.query("SELECT * FROM jogos WHERE id = ?", [id]);

    if (jogo.length === 0) {
      return res.status(404).json({ mensagem: "Jogo não encontrado" });
    }

    res.json(jogo[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao buscar jogo" });
  }
};

export const criar = async (req, res) => {
  try {
    const { nome, genero } = req.body;

    const [resultado] = await db.query(
      "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
      [nome, genero]
    );

    res.status(201).json({
      id: resultado.insertId,
      nome,
      genero,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao criar jogo" });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, genero } = req.body;

    const [resultado] = await db.query(
      "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
      [nome, genero, id]
    );

    // ✅ ADICIONADO
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Jogo não encontrado" });
    }

    res.json({ mensagem: "Jogo atualizado com sucesso" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao atualizar jogo" });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      "DELETE FROM jogos WHERE id = ?",
      [id]
    );

    // ✅ ADICIONADO
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Jogo não encontrado" });
    }

    res.json({ mensagem: "Jogo deletado com sucesso" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao deletar jogo" });
  }
};