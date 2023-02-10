function validateLaunchData(req, res, next) {
  const launch = req.body;
  let error = "";

  if (req.method === "POST") {
    try {
      for (const [key, value] of Object.entries(launch)) {
        if (!value) {
          error = "Missing launch parameter";
          throw new Error("Missing launch parameter");
        }
      }

      launch.launchDate = new Date(launch.launchDate);

      if (isNaN(launch.launchDate)) {
        error = "Invalid Date Format";
        throw new Error("Invalid Date Format");
      }
    } catch (err) {
      return res.status(400).json({ error });
    }
  }

  next();
}

module.exports = {
  validateLaunchData,
};
