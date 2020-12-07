class Ai {
  constructor() {
    this.minimaxScores = {
      x: -1,
      o: 1,
      tie: 0,
    };
  }

  bestMove(actualBoard) {
    const board = JSON.parse(JSON.stringify(actualBoard));
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'o';
          let score = this.minimax(board, 0, true);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, column: j };
          }
        }
      }
    }
    return bestMove;
  }

  minimax(board, depth, isMaximizing) {
    let bestScore = -Infinity;
    let bestMove;

    if (isMaximizing) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'o';
            let score = this.minimax(board, depth + 1, true);
            if (score > bestScore) {
              bestScore = score;
              bestMove = { row: i, column: j };
            }
          }
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'x';
            let score = this.minimax(board, depth + 1, false);
            if (score < bestScore) {
              bestScore = score;
              bestMove = { row: i, column: j };
            }
          }
        }
      }
    }
    return bestMove;
  }
}
