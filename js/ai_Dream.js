const GRID_SIZE = 9;
const BOX_SIZE = 3;

// Hàm tạo bản sao sâu của grid
const deepCopyGrid = (grid) => {
    return grid.map(row => [...row]);
};

// Hàm lấy danh sách các ô có thể điền số
const getPossibleValues = (board, row, col) => {
    let possible = new Set(Array.from({ length: GRID_SIZE }, (_, i) => i + 1));

    // Loại bỏ số đã có trong hàng, cột và khối 3x3
    for (let i = 0; i < GRID_SIZE; i++) {
        possible.delete(board[row][i]); // Hàng
        possible.delete(board[i][col]); // Cột
    }

    let boxStartRow = row - (row % BOX_SIZE);
    let boxStartCol = col - (col % BOX_SIZE);
    for (let i = 0; i < BOX_SIZE; i++) {
        for (let j = 0; j < BOX_SIZE; j++) {
            possible.delete(board[boxStartRow + i][boxStartCol + j]);
        }
    }
    return Array.from(possible);
};

// Hàm tìm ô trống tiếp theo
const findEmptyCell = (board) => {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === 0) return [row, col];
        }
    }
    return null;
};

// Hàm giải Sudoku bằng Constraint Propagation + Backtracking
const solveSudoku = (originalBoard) => {
    // Tạo bản sao của board để không thay đổi board gốc
    const board = deepCopyGrid(originalBoard);
    
    const solve = (board) => {
        let emptyCell = findEmptyCell(board);
        if (!emptyCell) return true; // Đã giải xong
        
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

    const solution = solveSudoku(su.question);
    if (solution) {
        let updateCells = [];

        // Thu thập danh sách các ô cần cập nhật
        for (let i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
            let row = Math.floor(i / GRID_SIZE);
            let col = i % GRID_SIZE;

            if (!cells[i].classList.contains('filled')) {
                updateCells.push({ index: i, value: solution[row][col] });
            }
        }

        let currentIndex = 0;

        // Hiển thị từng ô một cách tuần tự
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
        }, 200); // Điều chỉnh thời gian delay theo ý muốn (200ms mỗi ô)
    } else {
        console.log("Không tìm thấy giải pháp!");
    }
});