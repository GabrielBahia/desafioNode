import mongoose from "mongoose";

const membroSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    aniversario: {type: Date, required: true},
    departamentos: [{type: mongoose.Schema.Types.ObjectId, ref: 'departamentos', required: true}],
    cargo: {type: mongoose.Schema.Types.ObjectId, ref: 'cargos', required: true},
  }
);

const membros = mongoose.model('membros', membroSchema);

export default membros;