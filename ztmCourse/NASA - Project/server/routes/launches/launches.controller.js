const {
  getAllLaunches,
  existLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");

const { getPagination } = require("../../utils/query");

async function httpGetLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);

  return res.status(200).json(await getAllLaunches(skip, limit));
}

function httpPostLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  console.log(launchId);
  if (!(await existLaunchWithId(launchId))) {
    return res.status(404).json({ errr: `the launch doesn't exist` });
  }

  const aborted = await abortLaunchById(launchId);

  if (!aborted) return res.status(400).json({ error: "launch not aborted" });

  res.status(200).json({ ok: true });
}

module.exports = {
  httpGetLaunches,
  httpPostLaunch,
  httpAbortLaunch,
};
