const membros = require('../models/Membro.js');

const { InvalidArgumentError, InternalServerError } = require('../erros');

const jwt = require('jsonwebtoken');
const blacklist = require('../../redis/manipula-blacklist');

function criaTokenJWT(membro) {
  const payload = {
    id: membro.id
  };

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
  return token;
}

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
      if(err) {
        res.status(400).send({message: `${err.message} - Id do membro não localizado.`})
      } else {
        res.status(200).send(membros);
      }
    })
  }

  static store = (req, res) => {
    let membro = new membros(req.body);

    membro.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar membro.`})
      } else {
        res.status(201).send(membro.toJSON())
      }
    })
  }

  static update = (req, res) => {
    const id = req.params.id;

    membros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Membro atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static delete = (req, res) => {
    const id = req.params.id;

    membros.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Membro removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static login = (req, res) => {
    const token = criaTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  }

  static logout = async (req, res) => {
    try {
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

}

module.exports = MembroController;