import rankingsModel from '../models/rankingsModel.js';
 
class rankingsController {
 
  static async getRankingGeral(req, res) {
    try {
      const limit = parseInt(req.query.limit ?? req.query.limite) || 10;
 
      if (limit < 1 || limit > 100) {
        return res.status(400).json({ erro: 'O limite deve ser entre 1 e 100.' });
      }
 
      const ranking = await rankingsModel.getRankingGeral(limit);
 
      return res.status(200).json(ranking);
    } catch (error) {
      console.error('Erro ao buscar ranking geral:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar ranking geral.' });
    }
  }
 
  static async getRankingPorJogo(req, res) {
    try {
      const jogo_id = parseInt(req.params.jogo_id);
      const limit = parseInt(req.query.limit ?? req.query.limite) || 10;
 
      if (!jogo_id || isNaN(jogo_id)) {
        return res.status(400).json({ erro: 'ID do jogo inválido.' });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({ erro: 'O limite deve ser entre 1 e 100.' });
      }
 
      const ranking = await rankingsModel.getRankingComPosicao(jogo_id, limit);
 
      return res.status(200).json(ranking);
    } catch (error) {
      console.error('Erro ao buscar ranking por jogo:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar ranking por jogo.' });
    }
  }
 
  static async getRankingPorJogoQuery(req, res) {
    try {
      const jogo_id = parseInt(req.query.jogo_id);
      const limit = parseInt(req.query.limit ?? req.query.limite) || 10;
 
      if (!jogo_id || isNaN(jogo_id)) {
        return res.status(400).json({ erro: 'Informe o jogo_id como query param. Ex: /rankings/por-jogo?jogo_id=1' });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({ erro: 'O limite deve ser entre 1 e 100.' });
      }
 
      const ranking = await rankingsModel.getRankingComPosicao(jogo_id, limit);
 
      return res.status(200).json(ranking);
    } catch (error) {
      console.error('Erro ao buscar ranking por jogo:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar ranking por jogo.' });
    }
  }
 
  static async getRankingPorPlataforma(req, res) {
    try {
      const plataformasValidas = ['PC', 'PS', 'XBOX', 'MOBILE', 'NINTENDO', 'OUTRO'];
      const plataforma = req.params.plataforma?.toUpperCase();
      const limit = parseInt(req.query.limit ?? req.query.limite) || 10;
 
      if (!plataformasValidas.includes(plataforma)) {
        return res.status(400).json({
          erro: `Plataforma inválida. Valores aceitos: ${plataformasValidas.join(', ')}`,
        });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({ erro: 'O limite deve ser entre 1 e 100.' });
      }
 
      const ranking = await rankingsModel.getRankingPorPlataforma(plataforma, limit);
 
      return res.status(200).json(ranking);
    } catch (error) {
      console.error('Erro ao buscar ranking por plataforma:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar ranking por plataforma.' });
    }
  }
 
  static async getPosicaoPlayer(req, res) {
    try {
      const jogo_id = parseInt(req.params.jogo_id);
      const player_id = parseInt(req.params.player_id);
 
      if (!jogo_id || isNaN(jogo_id)) {
        return res.status(400).json({ erro: 'ID do jogo inválido.' });
      }
 
      if (!player_id || isNaN(player_id)) {
        return res.status(400).json({ erro: 'ID do player inválido.' });
      }
 
      const posicao = await rankingsModel.getPosicaoPlayer(player_id, jogo_id);
 
      if (!posicao) {
        return res.status(404).json({ erro: 'Player não encontrado no ranking deste jogo.' });
      }
 
      return res.status(200).json(posicao);
    } catch (error) {
      console.error('Erro ao buscar posição do player:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar posição do player.' });
    }
  }
}
 
export default rankingsController;