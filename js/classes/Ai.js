class Ai {
  constructor() {}

  bestMove(board) {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'o';
          let score = this.minimax(board);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, column: j };
          }
        }
      }
    }
    return bestMove;
  }

  minimax(board) {
    return 1;
  }
}
