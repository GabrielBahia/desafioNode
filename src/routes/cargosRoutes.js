const express = require('express');
const CargoController = require('../controllers/cargosController.js');

const router = express.Router();

router
  .get("/cargos", CargoController.index)
  .get("/cargos/:id", CargoController.show)
  .post("/cargos", CargoController.store)
  .put("/cargos/:id", CargoController.update)
  .delete("/cargos/:id", CargoController.delete)

  module.exports = router;   

