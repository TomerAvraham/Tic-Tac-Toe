import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Board from "./components/Board";
import "./style.css";

const END_POINT = "http://localhost:8000/";

const socket = io(END_POINT);

const App = () => {
  const [playerId, setPlayerId] = useState("");
  const [game, setGame] = useState({ board: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setPlayerId(socket.id);
    });

    socket.on("disconnect", () => {
      setPlayerId("");
    });

    socket.on("maxPlayer", (msg) => {
      setError(msg);
    });

    socket.on("gameRestart", (game) => {
      setGame(game);
    });

    socket.on("playerMove", (game) => {
      setGame(game);
    });

    socket.on("joinGame", (game) => {
      setGame(game);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const playAgainClick = () => {
    socket.emit("playAgain");
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {error ? (
        <div>
          <h1>Sorry, you cant play right now, {error}</h1>
        </div>
      ) : (
        <div className="board-wrapper">
          <Board socket={socket} playerId={playerId} game={game} />
          <button onClick={playAgainClick}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
