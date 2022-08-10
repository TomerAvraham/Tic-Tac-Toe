require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const Game = require("./util/Game");

let game = new Game();

io.on("connection", (socket) => {
  let player = game.addPlayer(socket.id);
  if (player === false) {
    socket.emit("maxPlayer", "2 Players are already playing");
  }

  io.emit("joinGame", game);

  socket.on("disconnect", () => {
    game.restartGame();
  });

  socket.on("move", (index) => {
    game.move(index);
    io.emit("playerMove", game);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
