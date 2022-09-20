import express from "express";
import CargoController from "../controllers/cargosController";

const router = express.Router();

router
  .get("/cargos", CargoController.index)
  .get("/cargos/:id", CargoController.show)
  .post("/cargos", CargoController.create)
  .put("/cargos/:id", CargoController.update)
  .delete("/cargos/:id", CargoController.delete)

export default router;   