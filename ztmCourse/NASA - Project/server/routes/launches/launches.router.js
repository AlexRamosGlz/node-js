const express = require("express");

const {
  httpGetLaunches,
  httpPostLaunch,
  httpAbortLaunch,
} = require("../launches/launches.controller");

const {
  validateLaunchData,
} = require("../../src/middleware/launch.middleware");

const launchesRouter = express.Router();

launchesRouter.use("/", validateLaunchData);
launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpPostLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
