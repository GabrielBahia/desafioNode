import express from "express";
import MembroController from "../controllers/membrosController.js";

const router = express.Router();

router
  .get("/membros", MembroController.index)
  .get("/membros/:id", MembroController.show)
  .post("/membros", MembroController.store)
  .put("/membros/:id", MembroController.update)
  .delete("/membros/:id", MembroController.delete)

export default router;   
