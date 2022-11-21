const express = require("express");
const User = require("./user.models");
const router = express.Router();
const bcrypt = require("bcrypt");
//const { generateSign } = require("../../utils/jwt/jwt");
const { json } = require("express");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
});
router.post("/createNewUser", async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    if (newUser.rol === "user") { //Comprobación para que nadie pueda hacerse admin desde fuera
      const created = await newUser.save();
      return res.status(200).json(created);
    } else {
      return res.status(500).json("No eres un ciclista, largo globero!");
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const dbUser = await User.findOne({ email: req.body.email });
    if (!dbUser) {
      return res.status(404), json("Esta bici no existe");
    }
    if (bcrypt.compareSync(req.body.password, dbUser.password)) {
      const token = generateSign(dbUser._id, dbUser.email);
      return res.status(200).json({ token, dbUser });
    } else {
      return res.status(200).json("La contraseña es incorrecta, prueba otra vez pero no la líes");
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
