const circle = 'far fa-circle';
const square = 'fas fa-times';
let isPlayerTurn = true;

const cellData = [
  { id: 1, occupiedWith: null },
  { id: 2, occupiedWith: null },
  { id: 3, occupiedWith: null },
  { id: 4, occupiedWith: null },
  { id: 5, occupiedWith: null },
  { id: 6, occupiedWith: null },
  { id: 7, occupiedWith: null },
  { id: 8, occupiedWith: null },
  { id: 9, occupiedWith: null }
];

/**
 * winning sequences:
 *    HORIZONTAL  
 *      1 - 2 - 3
 *      4 - 5 - 6
 *      7 - 8 - 9
 * 
 *    VERTICAL
 *      1 - 4 - 7
 *      2 - 5 - 8
 *      3 - 6 - 9
 * 
 *    DIAGONAL
 *      1 - 5 - 9
 *      3 - 5 - 7
 */
const winningSequences = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]


const initializeBoard = () => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      e.target.innerHTML = drawToCell(determineTurn(isPlayerTurn));
      populateCellData(e.target.dataset.cell, determineTurn(isPlayerTurn));
      
      if (!isPlayerTurn) {
        computerTurn();
      }
      const won = isWinningMove(determineTurn(isPlayerTurn));
      console.log(won)
    });
  })
}

const computerTurn = () => {
  const cellToDrawTo = cellData.find(cell => {
    return cell.occupiedWith === null;
  });

  const cellHtml = document.querySelector(`[data-cell='${cellToDrawTo.id}']`);
  cellHtml.innerHTML = drawToCell(determineTurn(false));
  populateCellData(cellToDrawTo.id, determineTurn(false));
}

const populateCellData = (cellId, player) => {
  isPlayerTurn = !isPlayerTurn;  
  const id = Number(cellId);
  const cellDataToPopulate = cellData.find(cell => {
    return id === cell.id;
  });
  cellDataToPopulate.occupiedWith = player;
};

const determineTurn = (isPlayerTurn) => {
  return isPlayerTurn ? 'human' : 'computer'
}

const drawToCell = (player) => {
  return `<i class="${player === 'human' ? 'fas fa-times' : 'far fa-circle'}"></i>`
}

const isWinningMove = (player) => {
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

const playerHasSequence = (sequence, player) => {
  let won = true;
  sequence.forEach(cellId => {
    const occupiedCell = cellData.find(cell => {
      return cell.id === cellId && cell.occupiedWith === player;
    });
    if (!occupiedCell) {
      won = false;
    }
  });
  return won;
}


initializeBoard();