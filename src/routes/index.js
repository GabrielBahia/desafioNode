import express from "express";
import membros from "./membrosRoutes.js"
import departamentos from "./departamentosRoutes.js"
import cargos from "./cargosRoutes.js"

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

export default routes