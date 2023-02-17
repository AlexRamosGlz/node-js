const axios = require("axios");

const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

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

async function loadLaunchData() {
  const response = await axios.post(SPACEX_API_URL, {
    options: {
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

    console.log(launch);
  }
}

async function existLaunchWithId(launchId) {
  return await launchesDB.findOne({ fligthNumber: launchId });
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
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existLaunchWithId,
};
