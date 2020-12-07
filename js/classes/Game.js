class Game {
  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
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
    this.circle = 'far fa-circle';
    this.times = 'fas fa-times';
    this.isPlayerTurn = true;
  }

  initializeBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const cell = e.target;
        console.log(cell.dataset.cell);
        cell.innerHTML = `<i class="${
          this.isPlayerTurn ? this.times : this.circle
        }"></i>`;
        this.populateGameBoard(cell.dataset.cell, this.isPlayerTurn);
        const gameOver = this.isWinningMove(
          this.board,
          this.winningSequences,
          this.isPlayerTurn,
        );

        if (gameOver) {
          return alert(
            `Game over player has ${this.isPlayerTurn ? 'won' : lost}`,
          );
        }

        this.isPlayerTurn = !this.isPlayerTurn;
      });
    });
  }

  populateGameBoard(cellDataId, isPlayer) {
    const xOrCircle = isPlayer ? 'x' : 'o';
    const { row, column } = this.getCellRowAndColumn(cellDataId);
    this.board[row][column] = xOrCircle;
    console.log(this.board);
  }

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

  isWinningMove(board, winningSequences, isPlayer) {
    const player = isPlayer ? 'x' : 'o';
    let isWinningMove = false;
    for (const sequence of winningSequences) {
      if (
        board[sequence[0].row][sequence[0].column] === player &&
        board[sequence[1].row][sequence[1].column] === player &&
        board[sequence[2].row][sequence[2].column] === player
      ) {
        isWinningMove = true;
        break;
      }
    }
    return isWinningMove;
  }
}
