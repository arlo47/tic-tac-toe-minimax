class Game {
  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.winningSequences = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
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

  isWinningMove() {
    let wasWinningMove = false;
    for (let i = 0; i < winningSequences.length; i++) {
      const sequence = winningSequences[i];
      if (playerHasSequence(sequence, player)) {
        wasWinningMove = true;
        break;
      }
    }
    return wasWinningMove;
  }
}
