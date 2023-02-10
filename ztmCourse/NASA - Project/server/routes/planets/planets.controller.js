const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPLanets(req, res) {
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPLanets,
};
