
import { Router } from 'express';
import rankingsController from '../controllers/rankingsController.js';
 
const router = Router();
 
router.get('/geral', rankingsController.getRankingGeral);
router.get('/por-jogo', rankingsController.getRankingPorJogoQuery);
router.get('/jogo/:jogo_id', rankingsController.getRankingPorJogo);
router.get('/plataforma/:plataforma', rankingsController.getRankingPorPlataforma);
router.get('/jogo/:jogo_id/player/:player_id', rankingsController.getPosicaoPlayer);
 
export default router;
