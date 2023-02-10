const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  console.log(launchId);
  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({ errr: `the launch doesn't exist` });
  }

  const aborted = abortLaunchById(launchId);
  res.status(200).json(aborted);
}

module.exports = {
  httpGetLaunches,
  httpPostLaunch,
  httpAbortLaunch,
};
