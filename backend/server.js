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
const users = {};
let game = new Game();

io.on("connection", (socket) => {
  users[socket.id] = socket.id;
  let player = game.addPlayer(socket.id);
  if (player === false) {
    socket.emit("maxPlayer", "2 Players are already playing");
  }

  io.emit("joinGame", game);

  socket.on("disconnect", () => {
    delete users[socket.id];
    game.restartGame(Object.keys(users)[0]);
    io.emit("gameRestart", game);
  });

  socket.on("move", (index) => {
    game.move(index);
    io.emit("playerMove", game);
  });

  socket.on("playAgain", () => {
    game = new Game();
    Object.keys(users).forEach((user) => game.addPlayer(user));
    console.log(game);
    io.emit("gameRestart", game);
  });

  console.log(game);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
