const httpServer = require("http").createServer();
const { Server } = require("socket.io");

const PORT = 3000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket served", socket.id);

  let playersCounter = 0;

  io.on("ready", (socket) => {
    playersCounter++;

    if (playersCounter === 2) {
      io.emit("startGame", socket.id);
    }
  });
});

httpServer.listen(PORT);
