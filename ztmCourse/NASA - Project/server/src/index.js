const http = require("http");

const mongoose = require("mongoose");

const { loadPlanetsData } = require("../models/planets.model");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://AlexRamosGlez:RlU5FR8K1sARRSg9@nasacluster.0zhicj3.mongodb.net/NASA?retryWrites=true&w=majority";

//the HTTP module is

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function loadServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  server.listen(PORT, () => console.log(`serving on PORT: ${PORT}`));
}

loadServer();
