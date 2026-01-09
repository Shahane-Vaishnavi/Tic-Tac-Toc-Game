let currentUser = '';
let gameMode = '';
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function login() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        currentUser = username;
        document.getElementById('welcomeMsg').textContent = `Welcome, ${currentUser}!`;
        showPage('modePage');
    } else {
        alert('Please enter a username');
    }
}

function logout() {
    currentUser = '';
    document.getElementById('username').value = '';
    showPage('loginPage');
}

function startGame(mode) {
    gameMode = mode;
    resetGame();
    createBoard();
    showPage('gamePage');
}

function createBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardEl.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    
    if (board[index] !== '' || !gameActive) return;
    
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    
    if (checkWinner()) {
        document.getElementById('status').textContent = `Player ${currentPlayer} Wins! 🎉`;
        document.getElementById('status').classList.add('winner');
        gameActive = false;
        return;
    }
    
    if (board.every(cell => cell !== '')) {
        document.getElementById('status').textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
    
    if (gameMode === 'computer' && currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    const emptyCells = board.map((cell, idx) => cell === '' ? idx : null).filter(val => val !== null);
    
    if (emptyCells.length === 0) return;
    
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    
    const cells = document.querySelectorAll('.cell');
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('o');
    
    if (checkWinner()) {
        document.getElementById('status').textContent = 'Computer Wins! 🤖';
        document.getElementById('status').classList.add('winner');
        gameActive = false;
        return;
    }
    
    if (board.every(cell => cell !== '')) {
        document.getElementById('status').textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }
    
    currentPlayer = 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = "Player X's Turn";
    document.getElementById('status').classList.remove('winner');
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

function backToMode() {
    showPage('modePage');
}