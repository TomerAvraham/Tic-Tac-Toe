import React, { useState } from "react";
import { useEffect } from "react";

const Board = ({ game, playerId, socket }) => {
  const [canPlay, setCanPlay] = useState(false);
  const [msg, setMsg] = useState("");

  function handleCellClick(e) {
    if (!canPlay || e.target.textContent !== "") return;
    console.log(e.target.getAttribute("data-cell-index"));
    socket.emit("move", e.target.getAttribute("data-cell-index"));
  }

  useEffect(() => {
    if (game.winner) {
      setCanPlay(false);
      let msg;
      game.winner === "tie"
        ? (msg = `Its a tie!`)
        : (msg = `The winner is - ${game.winner} !!`);
      setMsg(msg);
      return;
    }

    if (!game.p1 || !game.p2) {
      setCanPlay(false);
      setMsg("Waiting for player to join..");
    } else if (playerId === game.turn) {
      setCanPlay(true);
      setMsg("Your turn");
    } else if (playerId !== game.turn) {
      setCanPlay(false);
      setMsg("Opponent turn");
    }
  }, [game, game.turn, playerId]);

  const renderCells = game.board.map((cell, index) => (
    <div
      key={index}
      onClick={handleCellClick}
      data-cell-index={index}
      className="cell"
    >
      {cell}
    </div>
  ));

  return (
    <div className="board-wrapper">
      <h1>{msg}</h1>
      <div className="board-container">{renderCells}</div>
    </div>
  );
};

export default Board;
