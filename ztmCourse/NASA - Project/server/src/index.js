const http = require("http");
const { loadPlanetsData } = require("../models/planets.model");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//the HTTP module is

const server = http.createServer(app);

async function loadServer() {
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`serving on PORT: ${PORT}`));
}

loadServer();
