const express = require("express");
const { httpGetAllPLanets } = require("./planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPLanets);

module.exports = planetsRouter;
