const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
  },
  {
    versionKey: false
  }
);

const departamentos = mongoose.model('departamentos', departamentoSchema);


module.exports = departamentos;