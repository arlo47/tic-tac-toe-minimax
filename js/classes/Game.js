class Game {
  constructor() {
    // representation of board
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    // all possible win combinations
    this.winningSequences = [
      // horizonal
      [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
      ],
      [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
      ],
      [
        { row: 2, column: 0 },
        { row: 2, column: 1 },
        { row: 2, column: 2 },
      ],
      // diagonal
      [
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2 },
      ],
      [
        { row: 0, column: 2 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
      ],
      // vertical
      [
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 2, column: 0 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
      ],
      [
        { row: 0, column: 2 },
        { row: 1, column: 2 },
        { row: 2, column: 2 },
      ],
    ];
    this.circle = 'far fa-circle'; // font awesome icon code for O
    this.times = 'fas fa-times'; // font awesome icon code for X
    this.isPlayerTurn = true;
    this.ai = new Ai();
  }

  /**
   * Adds event listeners to all cells on board
   * determines if an X or O should be placed on the selected
   * cell based on isPlayerTurn
   * displays game over message if last move was a winning move
   */
  updateBoard(row, column, letter) {
    this.populateGameBoard(row, column, letter);
    let gameOver = this.checkWinner(this.board, this.winningSequences, 'x');

    if (gameOver) {
      return alert(`Game over: ${gameOver}!`);
    }

    if (!this.isPlayerTurn) {
      const aiMove = this.ai.bestMove(this.board);
      const aiCell = viewController.getHtmlCellFromRowAndColumn(
        aiMove.row,
        aiMove.column,
      );
      const letter = this.getTurnLetter();
      viewController.populateCell(aiMove.row, aiMove.column, letter, aiCell);
      this.populateGameBoard(aiMove.row, aiMove.column, letter);

      let gameOver = this.checkWinner(this.board, this.winningSequences, 'o');

      if (gameOver) {
        return alert(`Game over: ${gameOver}!`);
      }
    }
  }

  getTurnLetter() {
    return this.isPlayerTurn ? 'x' : 'o';
  }

  populateGameBoard(row, column, letter) {
    this.board[row][column] = letter;
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  /**
   * @description determins if last move was a
   * winning move based on the winningSequences
   * array
   *
   * @param {Array} board
   * @param {Array} winningSequences
   * @param {Boolean} isPlayer
   *
   * @returns {Boolean}
   */
  checkWinner(board, winningSequences, letter) {
    let result = null;
    let isWinningMove = false;

    for (const sequence of winningSequences) {
      if (
        board[sequence[0].row][sequence[0].column] === letter &&
        board[sequence[1].row][sequence[1].column] === letter &&
        board[sequence[2].row][sequence[2].column] === letter
      ) {
        result = letter;
        isWinningMove = true;
        break;
      }
    }

    if (!isWinningMove) {
      let emptyCellExists = false;
      for (const row of board) {
        for (const cell of row) {
          if (cell === '') {
            emptyCellExists = true;
            break;
          }
        }
        if (emptyCellExists) {
          break;
        }
      }

      if (!emptyCellExists) {
        result = 'tie';
      }
    }

    return result;
  }
}
