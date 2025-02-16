const deepCopyGrid = (grid) => {
    return grid.map(row => [...row]);
};

const getPossibleValues = (board, row, col) => {
    let possible = new Set(Array.from({ length: CONSTANT.GRID_SIZE }, (_, i) => i + 1));

    for (let i = 0; i < CONSTANT.GRID_SIZE; i++) {
        possible.delete(board[row][i]);
        possible.delete(board[i][col]); 
    }

    let boxStartRow = row - (row % CONSTANT.BOX_SIZE);
    let boxStartCol = col - (col % CONSTANT.BOX_SIZE);
    for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
        for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
            possible.delete(board[boxStartRow + i][boxStartCol + j]);
        }
    }
    return Array.from(possible);
};

const findEmptyCell = (board) => {
    for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
        for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
            if (board[row][col] === 0) return [row, col];
        }
    }
    return null;
};

const solveSudoku = (originalBoard) => {
    const board = deepCopyGrid(originalBoard);
    
    const solve = (board) => {
        let emptyCell = findEmptyCell(board);
        if (!emptyCell) return true;
        
        let [row, col] = emptyCell;
        let possibleValues = getPossibleValues(board, row, col);
        
        for (let value of possibleValues) {
            board[row][col] = value;
            if (solve(board)) return true;
            board[row][col] = 0;
        }
        return false;
    };

    if (solve(board)) {
        return board;
    }
    return null;
};

const btnStart = document.querySelector("#btn-suggest__1");

btnStart.addEventListener("click", () => {
    if (!su || !su.question) {
        console.log("Không có Sudoku để giải!");
        return;
    }
    
    const tmpGame_Dream = JSON.parse(localStorage.getItem('game'))
    const dream_Answer = tmpGame_Dream.su;
    const solution = solveSudoku(dream_Answer.answer);
    if (solution) {
        let updateCells = [];

        for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
            let row = Math.floor(i / CONSTANT.GRID_SIZE);
            let col = i % CONSTANT.GRID_SIZE;

            if (!cells[i].classList.contains('filled') ) {
                if( cells[i].textContent.trim() !== "" )  {
                    continue;
                }    
                else {
                    updateCells.push({ index: i, value: solution[row][col] });
                }
            }
        }

        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex >= updateCells.length) {
                clearInterval(interval);
                return;
            }

            let { index, value } = updateCells[currentIndex];
            cells[index].innerHTML = value;
            cells[index].setAttribute('data-value', value);
            cells[index].classList.add('suggested');

            currentIndex++;
        }, 200);
    } else {
        console.log("Không tìm thấy giải pháp!");
    }
});