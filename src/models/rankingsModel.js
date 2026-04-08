import db from '../config/db.js';

class rankingsModel {

  static async getRankingGeral(limit = 10) {
    const [rows] = await db.query(`
      SELECT 
        pl.id AS player_id,
        pl.nickname,
        pl.plataforma,
        SUM(p.pontos) AS total_pontos,
        COUNT(*) AS total_partidas
      FROM partidas AS p
      JOIN players AS pl ON pl.id = p.player_id
      GROUP BY pl.id, pl.nickname, pl.plataforma
      ORDER BY total_pontos DESC
      LIMIT ?
    `, [limit]);
    return rows;
  }

  static async getRankingComPosicao(jogo_id, limit = 10) {
    const [rows] = await db.query(`
      SELECT 
        ROW_NUMBER() OVER (ORDER BY total_pontos DESC) AS posicao,
        player_id,
        nickname,
        plataforma,
        total_pontos,
        total_partidas
      FROM vw_ranking_por_jogo
      WHERE jogo_id = ?
      LIMIT ?
    `, [jogo_id, limit]);
    return rows;
  }

  static async getRankingPorPlataforma(plataforma, limit = 10) {
    const [rows] = await db.query(`
      SELECT 
        pl.id AS player_id,
        pl.nickname,
        pl.plataforma,
        SUM(p.pontos) AS total_pontos,
        COUNT(*) AS total_partidas
      FROM partidas AS p
      JOIN players AS pl ON pl.id = p.player_id
      WHERE pl.plataforma = ?
      GROUP BY pl.id, pl.nickname, pl.plataforma
      ORDER BY total_pontos DESC
      LIMIT ?
    `, [plataforma, limit]);
    return rows;
  }

  static async getPosicaoPlayer(player_id, jogo_id) {
    const [rows] = await db.query(`
      SELECT posicao, player_id, nickname, plataforma, total_pontos, total_partidas
      FROM (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY total_pontos DESC) AS posicao,
          player_id,
          nickname,
          plataforma,
          total_pontos,
          total_partidas
        FROM vw_ranking_por_jogo
        WHERE jogo_id = ?
      ) AS ranked
      WHERE player_id = ?
    `, [jogo_id, player_id]);
    return rows[0] || null;
  }
}

export default rankingsModel;
