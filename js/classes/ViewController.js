class ViewController {
  constructor() {
    this.circle = 'far fa-circle'; // font awesome icon code for O
    this.times = 'fas fa-times'; // font awesome icon code for X
    this.bindBoard();
  }

  bindBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const cell = e.target;
        const position = this.getCellRowAndColumn(cell.dataset.cell);
        const letter = game.getTurnLetter();
        this.populateCell(position.row, position.column, letter, cell);
        game.updateBoard(position.row, position.column, letter);
      });
    });
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

  populateCell(row, column, letter, cell) {
    game.board[row][column] = letter;
    cell.innerHTML = `<i class="${this.getIconClass(letter)}"></i>`;
  }

  getIconClass(letter) {
    return letter === 'x' ? this.times : this.circle;
  }
}
