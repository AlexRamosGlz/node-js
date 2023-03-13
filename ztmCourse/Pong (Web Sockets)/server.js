const http = require("http");
const { Server } = require("socket.io");

const api = require("./api");
const sockets = require("./sockets");
const PORT = 3000;

const httpServer = http.createServer(api);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

sockets.listen(io);

httpServer.listen(PORT);
