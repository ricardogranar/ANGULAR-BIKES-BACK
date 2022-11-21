const express = require("express");
const Bike = require("./bike.model");
const upload = require("../middlewares/file");
const { deleteFile } = require("../../api/middlewares/deleteFile");
const { isAuth, isAdmin } = require("../../api/middlewares/auth");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allBikes = await Bike.find().lean();
    return res.status(200).json(allBikes);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const bikeToFind = await Bike.findById(id);
    return res.status(200).json(bikeToFind);
  } catch (error) {
    return next(error);
  }
});
router.get('/getbyname/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const bikeToFind = await Bike.findOne({name: name});
    return res.status(200).json(bikeToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res) => {
  try {
    const bike = req.body;
    if (req.file) {
      bike.img = req.file.path;
    }
    const newBike = new Bike(bike);
    const bikeCreated = await newBike.save();
    return res.status(200).json(bikeCreated);
  } catch (error) {
    return res
      .status(500)
      .json("Error al crear la nueva bicicleta, ¿no habrás subido una de carbono?");
  }
});

router.put("/edit/:id", upload.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const bike = req.body;
    const bikeToEdit = await Bike.findById(id);
    if (req.file) {
      if (bikeToEdit.img) {
        deleteFile(bikeToEdit.img);
      }
      bike.img = req.file.path;
    }
    const bikeModification = new Bike(bike);
    bikeModification._id = id;
    const bikeModificated = await Bike.findByIdAndUpdate(
      id,
      bikeModification
    );
    return res.status(200).json({
      mensaje: "Se ha conseguido editar la bicicleta!",
      bikeModificated: bikeModificated,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const bikeToDelete = await Bike.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar la bicicleta");
  } catch (error) {
    return res.status(500).json("Error al borrar la bicicleta");
  }
});

module.exports = router;
