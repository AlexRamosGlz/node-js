let playersCounter = 0;

function listen(io) {
  io.on("connection", (socket) => {
    let room;

    //socket.emit("connect", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(playersCounter / 2);
      socket.join(room);

      playersCounter++;

      console.log(`player ${socket.id} ready in room: ${room}`);
      if (playersCounter % 2 === 0) {
        io.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`User with id ${socket.id} disconnected: `, reason);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
