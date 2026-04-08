import { Router } from "express";
import * as partidasController from "../controllers/partidas_controller.js";

const router = Router();

router.get("/", partidasController.listar);
router.get("/:id", partidasController.buscarPorId);
router.post("/", partidasController.criar);
router.put("/:id", partidasController.atualizar);
router.delete("/:id", partidasController.deletar);

export default router; 