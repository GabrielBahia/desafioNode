const express = require('express');
const CargoController = require('../controllers/cargosController.js');
const protect = require("../middleware/auth");

const router = express.Router();

router
  .get("/cargos", CargoController.index)
  .get("/cargos/buscaNomeCargo", CargoController.buscarPorNome)
  .get("/cargos/:id", CargoController.show)
  .post("/cargos", protect, CargoController.store)
  .put("/cargos/:id", protect, CargoController.update)
  .delete("/cargos/:id", protect, CargoController.delete)

  module.exports = router;   

