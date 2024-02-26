function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let board = [
  [0, 2, 4, 0],
  [0, 0, 2, 8],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
//Yra fono laukeliai ir yra pozicijoje relative laukeliai su reik6m5mis viso 16*2
//vietoj ID(ar kartu) nustatin4ti x ir y ir laukeli7 pozicija keisis pagal tuos x ir y
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
  setTimeout(aditionalNumber, 1000);
});

function slideLeft() {
  let newBoard = [];
  for (let r = 0; r < board.length; r++) {
    let newRow = slide(board[r]);
    newBoard.push(newRow);
  }
  board = newBoard;
  // console.log(board);
  document
    .getElementById(`0-1`)
    .style.setProperty('animation', 'boxMove 500ms');
  document
    .getElementById(`0-2`)
    .style.setProperty('animation', 'boxMove 500ms');
  document
    .getElementById(`1-2`)
    .style.setProperty('animation', 'boxMove 500ms');
  document
    .getElementById(`1-3`)
    .style.setProperty('animation', 'boxMove 500ms');
  // setTimeout(loadBoord, 1000, board);
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

function aditionalNumber() {
  let cell = false;
  while (cell === false) {
    let row = Math.floor(Math.random() * board.length);
    let cloumn = Math.floor(Math.random() * board.length);
    if (board[row][cloumn] === 0) {
      cell = true;
      board[row][cloumn] = Math.random() > 0.9 ? 4 : 2;
      loadBoord(board);
      const newBox = document.getElementById(`${row}-${cloumn}`);
      newBox.style.setProperty('animation', 'appearing 1000ms');
    }
  }

  // document
  //   .getElementById(`0-3`)
  //   .style.setProperty('animation', 'boxMove 500ms');
}
