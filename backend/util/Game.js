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

    this.checkWinner();

    if (symbol === "x") {
      this.turn = this.p2;
    } else {
      this.turn = this.p1;
    }
  }

  checkWinner() {
    this.checkRows();
    this.checkColumns();
    this.checkDiagonal();

    if (this.moves >= 9) {
      this.winner = "tie";
    }
  }

  checkRows() {
    if (this.board[0] === this.board[1] && this.board[1] === this.board[2])
      return (this.winner = this.board[0]);
    if (this.board[3] === this.board[4] && this.board[4] === this.board[5])
      return (this.winner = this.board[3]);
    if (this.board[6] === this.board[7] && this.board[7] === this.board[8])
      return (this.winner = this.board[6]);
  }

  checkColumns() {
    if (this.board[0] === this.board[3] && this.board[3] === this.board[6])
      return (this.winner = this.board[0]);
    if (this.board[1] === this.board[4] && this.board[4] === this.board[7])
      return (this.winner = this.board[1]);
    if (this.board[2] === this.board[5] && this.board[5] === this.board[8])
      return (this.winner = this.board[2]);
  }

  checkDiagonal() {
    if (this.board[0] === this.board[4] && this.board[4] === this.board[8])
      return (this.winner = this.board[0]);
    if (this.board[2] === this.board[4] && this.board[4] === this.board[6])
      return (this.winner = this.board[2]);
  }
}

module.exports = Game;
