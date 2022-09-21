const express = require('express');
const MembroController = require('../controllers/membrosController.js');

const router = express.Router();

router
  .get("/membros", MembroController.index)
  .get("/membros/:id", MembroController.show)
  .post("/membros", MembroController.store)
  .put("/membros/:id", MembroController.update)
  .delete("/membros/:id", MembroController.delete)

module.exports = router;
