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
    // initialize the game
    this.initializeBoard();
  }

  /**
   * Adds event listeners to all cells on board
   * determines if an X or O should be placed on the selected
   * cell based on isPlayerTurn
   * displays game over message if last move was a winning move
   */
  initializeBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const cell = e.target;
        const playerMove = this.getCellRowAndColumn(cell.dataset.cell);
        this.populateGameBoard(
          playerMove.row,
          playerMove.column,
          this.isPlayerTurn,
          cell,
        );
        const gameOver = this.isWinningMove(
          this.board,
          this.winningSequences,
          this.isPlayerTurn,
        );

        if (gameOver) {
          return alert(`Game over: ${gameOver}!`);
        }

        if (!this.isPlayerTurn) {
          const aiMove = this.ai.bestMove(this.board);
          const aiCell = this.getHtmlCellFromRowAndColumn(
            aiMove.row,
            aiMove.column,
          );
          this.populateGameBoard(
            aiMove.row,
            aiMove.column,
            this.isPlayerTurn,
            aiCell,
          );
        }
      });
    });
  }

  populateGameBoard(row, column, isPlayer, cell) {
    const xOrCircle = isPlayer ? 'x' : 'o';
    const iconClass = isPlayer ? this.times : this.circle;
    this.board[row][column] = xOrCircle;
    cell.innerHTML = `<i class="${iconClass}"></i>`;
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  /**
   * @description gets row/column to of cell based on
   * data-cell attribute each cell has on html page
   *
   * @param {String} cellDataId
   *
   * @returns {Object}
   */
  getCellRowAndColumn(cellDataId) {
    const cellId = Number(cellDataId);
    let row = undefined;
    let column = undefined;

    if (cellId < 3) {
      row = 0;
      column = cellId;
    } else if (cellId < 6) {
      row = 1;
      column = cellId - 3;
    } else {
      row = 2;
      column = cellId - 6;
    }

    return { row, column };
  }

  getHtmlCellFromRowAndColumn(row, column) {
    const rowOffset = row * 3;
    const dataCell = rowOffset + column;
    const cell = document.querySelector(`[data-cell="${dataCell}"]`);
    return cell;
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
  isWinningMove(board, winningSequences) {
    const player = 'x';
    const ai = 'o';
    let result = null;
    let isWinningMove = false;

    for (const sequence of winningSequences) {
      if (
        board[sequence[0].row][sequence[0].column] === player &&
        board[sequence[1].row][sequence[1].column] === player &&
        board[sequence[2].row][sequence[2].column] === player
      ) {
        result = player;
        isWinningMove = true;
        break;
      } else if (
        board[sequence[0].row][sequence[0].column] === ai &&
        board[sequence[1].row][sequence[1].column] === ai &&
        board[sequence[2].row][sequence[2].column] === ai
      ) {
        result = ai;
        isWinningMove = true;
      }
    }

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

    return result;
  }
}
