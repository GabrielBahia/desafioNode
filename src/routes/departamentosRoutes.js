const express = require('express');
const DepartamentoController = require('../controllers/departamentosController.js');
const protect = require("../middleware/auth");


const router = express.Router();

router
  .get("/departamentos", DepartamentoController.index)
  .get("/departamentos/:id", DepartamentoController.show)
  .post("/departamentos", protect, DepartamentoController.store)
  .put("/departamentos/:id", protect, DepartamentoController.update)
  .delete("/departamentos/:id", protect, DepartamentoController.delete)

module.exports = router;  
