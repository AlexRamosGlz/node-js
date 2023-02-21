const path = require("path");

const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "you must login",
    });
  }

  next();
}

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send(`the secret code is "nomames"`);
});
module.exports = app;
