const cargos = require('../models/Cargo.js');

class CargoController {

  static index = (req, res) => {
    cargos.find()
      .exec((err, cargos) => {
        res.status(200).json(cargos)
  })
  }

  static show = (req, res) => {
    const id = req.params.id;
    cargos.findById(id)
      .exec((err, cargos) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do cargo não localizado.`})
      } else {
        res.status(200).send(cargos);
      }
    })
  }

  static store = (req, res) => {
    let cargo = new cargos(req.body);

    cargo.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar cargo.`})
      } else {
        res.status(201).send(cargo.toJSON())
      }
    })
  }

  static update = (req, res) => {
    const id = req.params.id;

    cargos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Cargo atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static delete = (req, res) => {
    const id = req.params.id;

    cargos.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Cargo removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static buscarPorNome = (req, res) => {
    const nome = req.query.nome
    cargos.find({'nome': nome}, {}, (err, cargos) => {
      if (!err && cargos.length != 0) {
        res.status(200).send(cargos);
      } else {
        res.status(500).send({ message: "Cargo não encontrado"});
      }
    })
  }


}

module.exports = CargoController;