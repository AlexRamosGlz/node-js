const launches = new Map();

let lastFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  succes: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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

function addNewLaunch(launch) {
  lastFlightNumber++;

  launches.set(lastFlightNumber, {
    ...launch,
    succes: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: lastFlightNumber,
  });
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existLaunchWithId,
};
