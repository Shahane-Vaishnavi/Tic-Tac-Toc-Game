let currentUser = '';
        let gameMode = '';
        let difficulty = '';
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

        function startGame(mode, diff) {
            gameMode = mode;
            difficulty = diff;
            resetGame();
            createBoard();
            showPage('gamePage');
        }

        function showDifficulty() {
            showPage('difficultyPage');
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
            let move;
            
            if (difficulty === 'easy') {
                move = getRandomMove();
            } else if (difficulty === 'medium') {
                // 50% chance smart move, 50% random
                move = Math.random() < 0.5 ? getBestMove() : getRandomMove();
            } else { // hard
                move = getBestMove();
            }
            
            if (move === -1) return;
            
            board[move] = 'O';
            const cells = document.querySelectorAll('.cell');
            cells[move].textContent = 'O';
            cells[move].classList.add('o');
            
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

        function getRandomMove() {
            const emptyCells = board.map((cell, idx) => cell === '' ? idx : null).filter(val => val !== null);
            if (emptyCells.length === 0) return -1;
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        function getBestMove() {
            // Check if computer can win
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    if (checkWinnerFor('O')) {
                        board[i] = '';
                        return i;
                    }
                    board[i] = '';
                }
            }
            
            // Block player from winning
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    if (checkWinnerFor('X')) {
                        board[i] = '';
                        return i;
                    }
                    board[i] = '';
                }
            }
            
            // Take center if available
            if (board[4] === '') return 4;
            
            // Take corners
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(i => board[i] === '');
            if (availableCorners.length > 0) {
                return availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }
            
            // Take any remaining space
            return getRandomMove();
        }

        function checkWinnerFor(player) {
            return winningConditions.some(condition => {
                return condition.every(index => {
                    return board[index] === player;
                });
            });
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