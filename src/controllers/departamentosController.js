const departamentos = require('../models/Departamento.js');

class DepartamentoController {

  static index = (req, res) => {
    departamentos.find()
      .exec((err, departamentos) => {
        res.status(200).json(departamentos)
  })
  }

  static show = (req, res) => {
    const id = req.params.id;

    departamentos.findById(id)
      .exec((err, departamentos) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do departamento não localizado.`})
      } else {
        res.status(200).send(departamentos);
      }
    })
  }

  static store = (req, res) => {
    let departamento = new departamentos(req.body);

    departamento.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar departamento.`})
      } else {
        res.status(201).send(departamento.toJSON())
      }
    })
  }

  static update = (req, res) => {
    const id = req.params.id;

    departamentos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Departamento atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static delete = (req, res) => {
    const id = req.params.id;

    departamentos.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Departamento removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }


}

module.exports = DepartamentoController;