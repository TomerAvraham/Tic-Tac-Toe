const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.winner = "";
    this.moves = 0;
    this.turn;
  }

  addPlayer(player) {
    if (!this.p1) return (this.p1 = player);
    this.turn = this.p1;
    if (!this.p2) return (this.p2 = player);
    return false;
  }

  clearBoard() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }

  restartGame(playerId) {
    this.moves = 0;
    this.turn = playerId;
    this.clearBoard();
    if (playerId === this.p1) {
      this.p1 = null;
    } else {
      this.p2 = null;
    }
  }

  move(index) {
    this.moves++;
    console.log(index);

    let symbol = this.turn === this.p1 ? "x" : "o";
    this.board[index] = symbol;

    if (symbol === "x") {
      this.turn = this.p2;
    } else {
      this.turn = this.p1;
    }
    this.checkWinner();
  }

  checkWinner() {
    WINNING_COMBO.forEach((combo) => {
      if (
        this.board[combo[0]] &&
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[0]] === this.board[combo[2]]
      )
        this.winner = this.board[combo[0]];
    });
    if (this.moves >= 9 && this.winner === "") {
      this.winner = "tie";
    }
  }
}

module.exports = Game;
