import express from "express";
import DepartamentoController from "../controllers/departamentosController";

const router = express.Router();

router
  .get("/departamentos", DepartamentoController.index)
  .get("/departamentos/:id", DepartamentoController.show)
  .post("/departamentos", DepartamentoController.create)
  .put("/departamentos/:id", DepartamentoController.update)
  .delete("/departamentos/:id", DepartamentoController.delete)

export default router;   