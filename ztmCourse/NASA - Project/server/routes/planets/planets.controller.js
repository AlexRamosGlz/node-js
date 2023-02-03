const { planets } = require("../../models/planets.model");

function getAllPLanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {
  getAllPLanets,
};
