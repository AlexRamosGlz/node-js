const cluster = require("cluster");

const express = require("express");

cluster.schedulingPolicy = cluster.SCHED_RR;

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get("/", (req, res) => {
  res.send(`Proccess: ${process.pid}`);
});

app.get("/delay", (req, res) => {
  delay(9000);

  res.send(`ding ding ding: ${process.pid}`);
});

console.log("workers");
app.listen(3000);
