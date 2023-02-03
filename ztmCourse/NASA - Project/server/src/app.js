const express = require("express");
const cors = require("cors");

const planetsRouter = require("../routes/planets/planets.router");
const routesConstants = require("../routes/routesConstants");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(routesConstants.PLANETS, planetsRouter);

module.exports = app;
