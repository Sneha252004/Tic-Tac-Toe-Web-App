const cells = document.querySelectorAll('.cell');
const titleHeader = document.getElementById('titleHeader');
const XPlayerDisplay = document.getElementById('XPlayerDisplay');
const OPlayerDisplay = document.getElementById('OPlayerDisplay');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Add click listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer); // Add X or O class for color

  if (checkWin()) {
    titleHeader.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    titleHeader.textContent = "It's a Tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateActivePlayer();
}

function checkWin() {
  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function updateActivePlayer() {
  if (currentPlayer === 'X') {
    XPlayerDisplay.classList.add('player-active');
    OPlayerDisplay.classList.remove('player-active');
  } else {
    OPlayerDisplay.classList.add('player-active');
    XPlayerDisplay.classList.remove('player-active');
  }
}

function restartGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O'); // Remove colors
  });
  gameActive = true;
  currentPlayer = 'X';
  titleHeader.textContent = 'Choose';
  updateActivePlayer();
}

// Initialize
updateActivePlayer();
