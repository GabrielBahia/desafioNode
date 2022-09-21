const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Membro = require('../models/Membro.js');

const { InvalidArgumentError } = require('./erros');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const blacklist = require('../../redis/manipula-blacklist');

function verificaMembro(membro) {
  if (!membro) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail!');
  }
}

async function verificaTokenNaBlacklist(token) {
  const tokenNaBlacklist = await blacklist.contemToken(token);
  if (tokenNaBlacklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!');
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos!');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false
    },
    async (email, senha, done) => {
      try {
        //const membro = await Membro.buscaPorEmail(email);
        const membro = await Membro.findOne({ email: email });
        verificaMembro(membro);
        senhaHash = membro.senha;
        await verificaSenha(senha, senhaHash);
        done(null, membro);
      } catch (erro) {
        done(erro);
      }
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verificaTokenNaBlacklist(token);
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const membro = await Membro.findById(payload.id);
        done(null, membro, { token: token });
      } catch (erro) {
        done(erro);
      }      
    }
  )
)
