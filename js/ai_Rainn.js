console.log("AI Back Tracking đang giải hehe......");

function getSudokuGrid() {
    let grid = [];
    let cells = document.querySelectorAll(".main-grid-cell");

    for (let i = 0; i < 81; i++) {
        let value = cells[i].textContent.trim();
        grid.push(value ? parseInt(value) : 0);
    }

    let board = [];
    while (grid.length) board.push(grid.splice(0, 9));

    console.log("📋 Lưới Sudoku lấy từ UI:", board);
    return board;
}

function updateUI(grid) {
    let cells = document.querySelectorAll(".main-grid-cell");
    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        cells[i].textContent = grid[row][col] !== 0 ? grid[row][col] : "";
    }
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}

function sudokuSolve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (sudokuSolve(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveWithBacktracking() {

    let grid = getSudokuGrid();
    if (!sudokuSolve(grid)) {
        return;
    }

    updateUI(grid);
}

document.getElementById("btn-suggest__2").addEventListener("click", solveWithBacktracking);
