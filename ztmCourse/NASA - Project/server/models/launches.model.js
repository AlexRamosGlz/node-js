const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

let lastFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  succes: true,
};

//launches.set(launch.flightNumber, launch);

saveLaunch(launch);

async function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-fligthNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.fligthNumber;
}

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.succes = false;
  return aborted;
}

// function addNewLaunch(launch) {
//   lastFlightNumber++;

//   launches.set(lastFlightNumber, {
//     ...launch,
//     succes: true,
//     upcoming: true,
//     customers: ["Zero to Mastery", "NASA"],
//     flightNumber: lastFlightNumber,
//   });
// }

async function scheduleNewLaunch(launch) {
  const newFligthNumber = Number(await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ...launch,
    succes: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFligthNumber,
  };

  await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) throw new Error("Planet not found!");

  await launchesDB.updateOne(
    {
      fligthNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existLaunchWithId,
};
