const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const LaunchesSchema = new mongoose.Schema({
  fligthNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  succes: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Launch", LaunchesSchema);
