const { parse } = require("csv-parse");
const fs = require("fs");

const habitabelPlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("../planets-project-master/kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitabelPlanets.push(data);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(
      habitabelPlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitabelPlanets.length} habitable planets found`);
  });
