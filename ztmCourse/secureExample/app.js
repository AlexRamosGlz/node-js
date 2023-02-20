const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/secret", (req, res) => {
  res.send(`the secret code is "nomames"`);
});
module.exports = app;
