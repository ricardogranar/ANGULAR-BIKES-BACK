const express = require("express");
//aqui van las rutas
const indexRoutes = require("./src/api/index/index.routes");
const bikesRoutes = require("./src/api/bike/bike.routes");
const userRouter = require("./src/api/users/user.routes");
const db = require("./src/utils/database/db");

const cors = require('cors');
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = 3000;
const server = express();

server.use(cors({
    origin: "*",
    credentials: true
}))

server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ extended: false }));
server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
  });

//RUTAS
server.use("/", indexRoutes);
server.use("/bikes", bikesRoutes);
server.use("/users", userRouter);
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});




server.listen(PORT, () => {
    console.log(`Server running a todo gas en http://localhost:${PORT}`);
  });
