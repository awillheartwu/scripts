'use strict';
function isSafe(board, row, col, num) {
    // 检查行是否安全
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // 检查列是否安全
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // 检查3x3小方格是否安全
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

let count = 0;

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        count += 1;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// 9x9数独板，0表示空格
const board = [
    [ 0, 5, 0, 0, 6, 4, 7, 3, 2 ],
    [ 0, 7, 0, 5, 0, 0, 4, 0, 8 ],
    [ 4, 0, 0, 0, 8, 0, 0, 6, 0 ],
    [ 0, 0, 0, 0, 2, 9, 0, 5, 0 ],
    [ 2, 0, 4, 0, 0, 7, 1, 9, 0 ],
    [ 0, 0, 5, 3, 0, 0, 0, 0, 7 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 0 ],
    [ 7, 0, 0, 0, 0, 0, 9, 4, 6 ],
    [ 6, 0, 0, 0, 0, 0, 8, 0, 5 ],
];

if (solveSudoku(board)) {
    console.log('解数独成功:');
    console.log(board);
    console.log('尝试次数:', count);
} else {
    console.log('没有找到解决方案');
}
