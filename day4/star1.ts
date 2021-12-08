import { drawData, boardData } from './data.js';

const MARK = 'x';

function convertBoardDataToArrays(str: string): (number | string)[][][] {
  const boards = str.split(/\n\n/); // each board is separated by an empty newline
  return boards.map((board) => {
    const rows = board.split(/\n/).filter((x) => x.trim()); // each row in a board is separated by a newline
    return rows.map((row) => {
      const entries = row.split(/\W+/).map((x) => parseInt(x, 10)); // each entry in a row is separated by whitespace
      return entries;
    });
  });
}

function isMarked(entry: number | string) {
  return entry === MARK;
}

function markDrawnNumberOnBoard(board: (number | string)[][], number: number) {
  return board.map((row) => {
    return row.map((entry) => {
      if (entry === number) {
        return MARK;
      }
      return entry;
    });
  });
}

function checkForWin(board: (number | string)[][]) {
  return checkForRowWin(board) || checkForColWin(board);
}

function checkForRowWin(board: (number | string)[][]) {
  for (let row of board) {
    if (row.every((entry) => isMarked(entry))) {
      return true;
    }
  }
  return false;
}

function checkForColWin(board: (number | string)[][]) {
  for (let index in board) {
    let column = [];
    for (let row of board) {
      column.push(row[index]);
    }
    if (column.every((entry) => isMarked(entry))) {
      return true;
    }
  }
  return false;
}

function getScore(board: (number | string)[][], winningDrawnNumber: number) {
  let score: number = 0;
  const reducer = (prev: number, curr: number | string): number => {
    if (typeof curr === 'number') {
      return prev + curr;
    }
    return prev;
  };
  board.forEach((row) => {
    score = row.reduce<number>(reducer, score);
  });
  score *= winningDrawnNumber;
  return score;
}

let boardsArr = convertBoardDataToArrays(boardData);
let winningBoard: (string | number)[][];
let currentDrawIndex = -1;
while (!winningBoard && currentDrawIndex < drawData.length) {
  currentDrawIndex++;
  const drawnNumber = drawData[currentDrawIndex];
  boardsArr = boardsArr.map((board) =>
    markDrawnNumberOnBoard(board, drawnNumber)
  );
  for (let board of boardsArr) {
    if (checkForWin(board)) {
      winningBoard = board;
      break;
    }
  }
}

console.log(winningBoard);
const winningDrawnNumber = drawData[currentDrawIndex];
console.log(getScore(winningBoard, winningDrawnNumber));
