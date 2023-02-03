const express = require("express");
const { getAllPLanets } = require("./planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/", getAllPLanets);

module.exports = planetsRouter;
