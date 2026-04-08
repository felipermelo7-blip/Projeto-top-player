import { Router } from "express";
import * as playerController from "../controllers/player_controller.js";

const router = Router();

router.get("/", playerController.listar);
router.get("/:id", playerController.buscarPorId);
router.post("/", playerController.criar);
router.put("/:id", playerController.atualizar);
router.delete("/:id", playerController.deletar);

export default router;