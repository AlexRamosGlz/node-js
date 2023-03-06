const express = require("express");

const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");
const routesConstants = require("./routesConstants");

const api = express.Router();

api.use(routesConstants.PLANETS, planetsRouter);
api.use(routesConstants.LAUNCHES, launchesRouter);
api.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = api;
