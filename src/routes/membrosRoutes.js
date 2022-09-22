const express = require('express');
const MembroController = require('../controllers/membrosController.js');
const protect = require("../middleware/auth");

const router = express.Router();

router
  .get("/membros", MembroController.index)
  .get("/membros/:id", MembroController.show)
  .post("/membros", protect, MembroController.store)
  .put("/membros/:id", protect, MembroController.update)
  .delete("/membros/:id", protect, MembroController.delete)
  .post('/membro/login', MembroController.login)
  .get('/membro/logout', MembroController.logout)

module.exports = router;


