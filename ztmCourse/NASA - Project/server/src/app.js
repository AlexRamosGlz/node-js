const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");

const launchesRouter = require("../routes/launches/launches.router");
const planetsRouter = require("../routes/planets/planets.router");
const routesConstants = require("../routes/routesConstants");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(routesConstants.PLANETS, planetsRouter);
app.use(routesConstants.LAUNCHES, launchesRouter);

module.exports = app;
