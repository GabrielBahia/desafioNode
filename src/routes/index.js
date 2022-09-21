const express = require('express');
const membros = require('./membrosRoutes.js');
const departamentos = require('./departamentosRoutes.js');
const cargos = require('./cargosRoutes.js');

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "CRUD de membros"})
  })

  app.use(
    express.json(),
    membros,
    departamentos,
    cargos
  )
}

module.exports = routes;
