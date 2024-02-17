function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let board = [
  [2, 2, 4, 4],
  [0, 2, 2, 0],
  [0, 0, 2, 2],
  [0, 0, 8, 8],
];

function loadBoord(board) {
  let markup = '';
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      const value = board[r][c];
      markup += `<div class="block box${value}" id="${r}-${c}">${
        value === 0 ? '' : value
      }</div>`;
    }
  }
  const gameBoard = document.querySelector('.container');
  gameBoard.innerHTML = markup;
}

loadBoord(board);

function filterZerosOut(row) {
  return row.filter((e) => e > 0);
}

function slide(row) {
  let filtered = filterZerosOut(row);
  for (let n = 0; n < filtered.length; n++) {
    if (filtered[n] === filtered[n + 1]) {
      filtered[n] = filtered[n] * 2;
      filtered[n + 1] = 0;
    }
  }
  filtered = filterZerosOut(filtered);

  for (let z = 0; z < row.length; z++) {
    if (!filtered[z]) filtered[z] = 0;
  }
  return filtered;
}
slide(board[0]);
slide(board[1]);
slide(board[2]);
slide(board[3]);

document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') {
    slideLeft();
  }
  if (e.code === 'ArrowRight') {
    slideRight();
  }
  if (e.code === 'ArrowUp') {
    slideUp();
  }
  if (e.code === 'ArrowDown') {
    slideDown();
  }
});

function slideLeft() {
  let newBoard = [];
  for (let r = 0; r < board.length; r++) {
    let newRow = slide(board[r]);
    newBoard.push(newRow);
  }
  board = newBoard;
  console.log(board);
  loadBoord(board);
}

function slideRight() {
  let newBoard = [];
  for (let r = 0; r < board.length; r++) {
    board[r].reverse();
    let newRow = slide(board[r]);
    newRow.reverse();
    newBoard.push(newRow);
  }
  board = newBoard;
  console.log(board);
  loadBoord(board);
}

function transposeBoard() {
  let newBoard = [];
  for (let c = 0; c < board.length; c++) {
    let newRow = [];
    for (let r = 0; r < board[c].length; r++) {
      newRow.push(board[r][c]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

function slideUp() {
  board = transposeBoard();
  let newBoard = [];
  for (let r = 0; r < board.length; r++) {
    let newRow = slide(board[r]);
    newBoard.push(newRow);
  }
  board = newBoard;
  board = transposeBoard();
  loadBoord(board);
}

function slideDown() {
  board = transposeBoard();
  let newBoard = [];
  for (let r = 0; r < board.length; r++) {
    let newRow = slide(board[r].reverse());
    newBoard.push(newRow.reverse());
  }
  board = newBoard;
  console.log(board);
  board = transposeBoard();
  console.log(board);
  loadBoord(board);
}
