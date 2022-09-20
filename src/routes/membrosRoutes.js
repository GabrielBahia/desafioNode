import express from "express";
import MembroController from "../controllers/membrosController.js";

const router = express.Router();

router
  .get("/membros", LivroController.index)
  .get("/membros/:id", LivroController.show)
  .post("/membros", LivroController.create)
  .put("/membros/:id", LivroController.update)
  .delete("/membros/:id", LivroController.delete)

export default router;   