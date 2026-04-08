import { Router } from "express";
import * as jogosController from '../controllers/jogos_controller.js';

const router = Router();

router.get('/', jogosController.listar);
router.get('/:id', jogosController.buscarPorId);
router.post('/', jogosController.criar);
router.put('/:id', jogosController.atualizar);
router.delete('/:id', jogosController.deletar);

export default router;