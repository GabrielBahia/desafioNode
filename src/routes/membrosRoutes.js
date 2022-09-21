const express = require('express');
const MembroController = require('../controllers/membrosController.js');
const middlewaresAutenticacao = require('../auth/middlewares-autenticacao.js');

const router = express.Router();

router
  .get("/membros", MembroController.index)
  .get("/membros/:id", MembroController.show)
  .post("/membros", MembroController.store)
  .put("/membros/:id", MembroController.update)
  .delete("/membros/:id", MembroController.delete)
  .post('/membro/login', middlewaresAutenticacao.local, MembroController.login)
  .get('/membro/logout', middlewaresAutenticacao.bearer, MembroController.logout)

module.exports = router;


