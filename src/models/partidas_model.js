import { conexao } from "../config/db.js";

export const listar = () => {
  return conexao.query(`SELECT partidas.id, jogos.nome AS jogo, players.nickname as player,  partidas.pontos  , partidas.data_partida  FROM partidas
INNER JOIN jogos ON jogos.id = partidas.jogo_id
INNER JOIN players ON players.id = partidas.player_id`);
};

export const buscarPorId = (id) => {
  return conexao.query("SELECT * FROM partidas WHERE id = ?", [id]);
};

export const criar = (jogo_id, player_id, pontos, data_partida) => {
  return conexao.query(
    "INSERT INTO partidas (jogo_id, player_id, pontos, data_partida) VALUES (?, ?, ?, ?)",
    [jogo_id, player_id, pontos, data_partida]
  );
};

export const atualizar = (id, jogo_id, player_id, pontos, data_partida) => {
  return conexao.query(
    "UPDATE partidas SET jogo_id = ?, player_id = ?, pontos = ?, data_partida = ? WHERE id = ?",
    [jogo_id, player_id, pontos, data_partida, id]
  );
};

export const deletar = (id) => {
  return conexao.query("DELETE FROM partidas WHERE id = ?", [id]);
};