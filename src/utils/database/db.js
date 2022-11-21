const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;
console.log(DB_URL);
if (!DB_URL) throw new Error("No se encuentra la URL a la base de datos");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Conectado con éxito a la db: ${name} en ${host}`);
  } catch (error) {
    console.log("Error conectando a la base de datos:", error);
  }
};

module.exports = {
  connectDb,
  DB_URL,
};
