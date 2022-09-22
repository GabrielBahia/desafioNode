const jwt = require("jsonwebtoken");
const Membro = require("../models/Membro");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.membro = await Membro.findById(decoded.id).select("-senha");
      if (decoded.id == req.params.id) {
        next();
      } else {
        res.status(401).json("Não autorizado, Token inválido");
      }
    } catch (error) {
      res.status(401).json("Não autorizado, Token inválido");
    }
  }
  else {
    res.status(401).json("Não autorizado, Token inválido");
  }
};

module.exports = protect;
