const mongoose = require("mongoose");
const Bike = require("../../api/bike/bike.model");
DB_URL="mongodb+srv://ricardo:ricardo@cluster0.5af8slh.mongodb.net/?retryWrites=true&w=majority";



const bikes = [
  {
    name: "Tour de France Velectrik Road Bicycle",
    brand: "Automoto",
    year: 1930,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050281/bikes/Automoto_Tour_de_France_Velectrik_Road_Bicycle_1930_54_ogel3c.png",
    location: "Francia",
  },
 
  {
    name: "Special Orovelato Gold Plated Road Bicycle",
    brand: "Bertorelle",
    year: 1980,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050278/bikes/Bertorelle_Special_Orovelato_Gold_Plated_Road_Bicycle_1980_59_swns1l.png",
    location: "Italia",
  }, 

  {
    name: "Nuovo Mexico Oro Gold Plated Bicycle",
    brand: "Colnago",
    year: 1990,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050280/bikes/Colnago_Nuovo_Mexico_Oro_Gold_Plated_Bicycle_57_cl0ch8.png",
    location: "Italia",
  },

  {
    name: "Oval CX Aero Road Bicycle",
    brand: "Colnago",
    year: 1980,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050281/bikes/Colnago_Oval_CX_Aero_Road_Bicycle_1980_59_rin5fo.png",
    location: "Italia",
  },

  {
    name: "Truss Road Bike",
    brand: "Labor",
    year: 1910,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050278/bikes/Labor_Truss_Road_Bike_1910_58_uj6m9k.png",
    location: "Francia",
  },

  {
    name: "SLX Campagnolo 50th Anniversary Bike",
    brand: "Patelli",
    year: 1980,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050279/bikes/Patelli_SLX_Campagnolo_50th_Anniversary_Bike_1980_60_xasood.png",
    location: "Italia",
  },

  {
    name: "Semi-Luxe Course Road Bicycle",
    brand: "Peugeot",
    year: 1920,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050278/bikes/Peugeot_Semi-Luxe_Course_Road_Bicycle_1920_hqt737.png",
    location: "Francia",
  },

  {
    name: "Record Gold Plated Spectacular Road Bicycle",
    brand: "Rossin",
    year: 1995,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050280/bikes/Rossin_Record_Gold_Plated_Spectacular_Road_Bicycle_54_ndho6v.png",
    location: "Italia",
  },

  {
    name: "Team Specialissima Pietro Guerra Bike",
    brand: "Bianchi",
    year: 1974,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050278/bikes/Team_Bianchi_Specialissima_Pietro_Guerra_Bike_1974_53_n2al4g.png",
    location: "Italia",
  },

  {
    name: "Triestina Oro Neo Retro Gold Road Bike",
    brand: "Wilier",
    year: 1991,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1669050280/bikes/Wilier_Triestina_Oro_Neo_Retro_Gold_Road_Bike_55_fcugfp.png",
    location: "Alemania",
  },
];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const allBikes = await Bike.find().lean();

    if (!allBikes.length) {
      console.log("[seed]: No estoy encontrando las bicicletas ... ");
    } else {
      console.log(`[seed]: Encontrados ${allBikes.length} bicicletas.`);
      await Bike.collection.drop();
      console.log("[seed]: Colección bicicletas eliminada correctamente");
    }
  })
  .catch((error) => console.log("[seed]: Error eliminando la colección -->", error))
  .then(async () => {
    await Bike.insertMany(bikes);
    console.log("[seed]: Nuevas bicicletas añadidas con éxito");
  })
  .catch((error) => console.log("[seed]: Error añadiendo las bicicletas", error))
  .finally(() => mongoose.disconnect());

