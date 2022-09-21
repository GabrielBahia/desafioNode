const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const membroSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    aniversario: { type: Date, required: true },
    departamentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'departamentos', required: true }],
    cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'cargos', required: true },
  }
);

membroSchema.pre('save', function (next) {
  if (!this.isModified('senha')) {
    return next();
  }

  bcrypt.hash(this.senha, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.senha = passwordHash;
    next();
  });
});

membroSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.senha, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      if(!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
}

const membros = mongoose.model('membros', membroSchema);

module.exports = membros;