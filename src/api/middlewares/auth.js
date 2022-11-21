const User = require("../../api/users/user.models");
//const { verifyJwt } = require("../../utils/jwt/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogged = await User.findById(validToken.id);

    userLogged.password = null;
    req.user = userLogged;
    next();
  } catch (error) {
    return next("No puedes pasar");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogged = await User.findById(validToken.id);

    if (userLogged.rol === "admin") {
      userLogged.password = null;
      req.user = userLogged;
      next();
    } else {
      return next("No eres un Mecenas, vete a limpiar establos");
    }
  } catch (error) {
    return next("No puedes pasar");
  }
};

module.exports = { isAuth, isAdmin };



