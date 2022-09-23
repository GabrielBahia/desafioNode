const express = require('express');
const dotenv = require("dotenv");
const db = require('./config/dbConnect.js');
const routes = require('./routes/index.js');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const app = express();

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

app.use(express.json())
routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


module.exports = app;