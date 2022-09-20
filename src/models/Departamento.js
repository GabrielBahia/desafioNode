import mongoose from "mongoose";

const departamentoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
  }
);

const departamentos = mongoose.model('departamentos', departamentoSchema);

export default departamentos;