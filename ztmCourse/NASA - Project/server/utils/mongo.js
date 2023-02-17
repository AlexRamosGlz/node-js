const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://AlexRamosGlez:RlU5FR8K1sARRSg9@nasacluster.0zhicj3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongo() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongo,
};
