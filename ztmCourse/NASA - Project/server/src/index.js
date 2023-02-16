const http = require("http");
require("dotenv").config();

const { loadPlanetsData } = require("../models/planets.model");

const { connectMongo } = require("../utils/mongo");

const app = require("./app");

const PORT = process.env.PORT || 8000;

//the HTTP module is

const server = http.createServer(app);

async function loadServer() {
  await connectMongo();

  await loadPlanetsData();
  server.listen(PORT, () => console.log(`serving on PORT: ${PORT}`));
}

loadServer();
