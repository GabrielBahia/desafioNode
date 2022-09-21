const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
  },
  {
    versionKey: false
  }
);

const cargos = mongoose.model('cargos', cargoSchema);

module.exports = cargos;