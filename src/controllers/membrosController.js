const membros = require('../models/Membro.js');
const generateToken = require("../utils/generateToken");

const jwt = require('jsonwebtoken');

class MembroController {

  static index = (req, res) => {
    membros.find()
      .populate(['cargo', 'departamentos'])
      .exec((err, membros) => {
        res.status(200).json(membros)
      })
  }

  static show = (req, res) => {
    const id = req.params.id;

    membros.findById(id)
      .populate(['cargo', 'departamentos'])
      .exec((err, membros) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id do membro não localizado.` })
        } else {
          res.status(200).send(membros);
        }
      })
  }

  static store = (req, res) => {
    let membro = new membros(req.body);

    membro.save((err) => {

      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar membro.` })
      } else {
        res.status(201).send(membro.toJSON())
      }
    })
  }

  static update = (req, res) => {
    const id = req.params.id;

    membros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Membro atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static delete = (req, res) => {
    const id = req.params.id;

    membros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Membro removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static async login(req, res) {
    const { email, senha } = req.body;
    const membro = await membros.findOne({ email });
    if (!membro) {
      res.status(400).json("Usuário não existe!!");
    }

    if (await membro.matchPassword(senha)) {
      res.status(200).json({
        id: membro.id,
        nome: membro.nome,
        email: membro.email,
        token: generateToken(membro.id),
      });
    } else {
      res.status(400).json("E-mail ou senha inválidos");
    }
  }

  static logout(req, res) {
    res.status(200).json("Logout efetuado com sucesso");
  }


}

module.exports = MembroController;