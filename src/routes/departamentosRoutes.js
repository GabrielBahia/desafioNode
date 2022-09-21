const express = require('express');
const DepartamentoController = require('../controllers/departamentosController.js');


const router = express.Router();

router
  .get("/departamentos", DepartamentoController.index)
  .get("/departamentos/:id", DepartamentoController.show)
  .post("/departamentos", DepartamentoController.store)
  .put("/departamentos/:id", DepartamentoController.update)
  .delete("/departamentos/:id", DepartamentoController.delete)

module.exports = router;  
