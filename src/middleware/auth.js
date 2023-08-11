const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const dotenv = require('dotenv');
dotenv.config();

const emitToken = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({
    where: { email },
    attributes: ["id", "email", "password", "admin"],
  });
  if (!user) {
    return res
      .status(400)
      .json({ code: 400, message: "Error de autenticación." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ code: 401, message: "Credenciales no válidas." });
  }

  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user.id,
    },
    process.env.JWT_SECRET_KEY
  );

  req.token = token;


  next();
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        code: 401,
        message: "No se ha proporcionado un token.",
      });
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (error, decoded) => {
        if (error) {
          return res.status(401).json({
            code: 401,
            message: "Debe proporcionar un token válido",
          });
        }
        try {
          let user = await User.findByPk(decoded.data, {
            attributes: ["id", "email", "admin"],
          });
          if (!user) {
            return res.status(400).json({
              code: 400,
              message: "Usuario ya no existe en la base de datos.",
            });
          }
          req.user = user;

          next();
        } catch (error) {
          res.status(500).json({ code: 500, message: "Error en autenticación." });
        }
      }
    );
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: error.message,
    });
  }
};


const validateAdmin = async (req, res, next) => {
  let user = req.user;

  if (!user.admin) {
    return res.status(403).json({
      code: 403,
      message: "Usted no tiene los permisos necesarios para continuar.",
    });
  }
  next();
};

module.exports = {
  emitToken,
  verifyToken,
  validateAdmin,
};
