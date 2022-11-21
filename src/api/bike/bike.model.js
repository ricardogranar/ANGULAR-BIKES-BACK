const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bikeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    img: {
      type: String,
      required: false,
      default:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/02/patinete-caida-2234331.jpg",
    },
    location: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Bike = mongoose.model("bikes", bikeSchema);
module.exports = Bike;
