const jwt = require("jsonwebtoken");
const Membro = require("../models/Membro");

const protect = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ auth: false, message: 'Não autorizado, Token inválido!' });
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Não autorizado, Token inválido!' });
      
      next();
    });
  }
  else {
    res.status(401).json("Não autorizado, Token inválido!");
  }
};

module.exports = protect;
