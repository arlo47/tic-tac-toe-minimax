class Ai {
  constructor() {
    this.minimaxScores = {
      x: -1,
      o: 1,
      tie: 0,
    };
  }

  bestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'o';
          let score = this.minimax(board, 0, true);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { row: i, column: j };
          }
        }
      }
    }
    return move;
  }

  minimax(board, depth, isMaximizing) {
    const gameOutcome = game.isWinningMove(board, game.winningSequences);

    if (gameOutcome !== null) {
      return this.minimaxScores[gameOutcome];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'o';
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'x';
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
}
