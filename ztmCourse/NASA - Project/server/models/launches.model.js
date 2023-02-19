const axios = require("axios");

const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunchData() {
  const response = await axios.post(SPACEX_API_URL, {
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) throw new Error("Launch Data download failed");

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];

    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      fligthNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      succes: launchDoc["success"],
      customers,
    };

    saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) return;

  await populateLaunchData();
}

async function findLaunch(filter) {
  return await launchesDB.findOne(filter);
}

async function existLaunchWithId(launchId) {
  return await findLaunch({ fligthNumber: launchId });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-fligthNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.fligthNumber;
}

async function getAllLaunches(skip, limit) {
  return await launchesDB
    .find({}, { _id: 0, __v: 0 })
    .sort("fligthNumber")
    .skip(skip)
    .limit(limit);
}

async function abortLaunchById(launchId) {
  const res = await launchesDB.updateOne(
    {
      fligthNumber: launchId,
    },
    {
      upcoming: false,
      succes: false,
    }
  );

  return res.matchedCount === 1;
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) throw new Error("Planet not found!");

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
  await launchesDB.updateOne(
    {
      fligthNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existLaunchWithId,
};
