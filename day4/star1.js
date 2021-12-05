import { drawData, boardData } from './data.js';

const MARK = 'x';

function convertBoardDataToArrays(str) {
  const boards = str.split(/\n\n/); // each board is separated by an empty newline
  return boards.map((board) => {
    const rows = board.split(/\n/).filter((x) => x.trim()); // each row in a board is separated by a newline
    return rows.map((row) => {
      const entries = row.split(/\W+/).map((x) => parseInt(x, 10)); // each entry in a row is separated by whitespace
      return entries;
    });
  });
}

function isMarked(entry) {
  return entry === MARK;
}

function markDrawnNumberOnBoard(board, number) {
  return board.map((row) => {
    return row.map((entry) => {
      if (entry === number) {
        return MARK;
      }
      return entry;
    });
  });
}

function checkForWin(board) {
  return checkForRowWin(board) || checkForColWin(board);
}

function checkForRowWin(board) {
  for (let row of board) {
    if (row.every((entry) => isMarked(entry))) {
      return true;
    }
  }
  return false;
}

function checkForColWin(board) {
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

function getScore(board, winningDrawnNumber) {
  let score = 0;
  const reducer = (prev, curr) => (isNaN(curr) ? prev : prev + curr);
  board.forEach((row) => {
    score = row.reduce(reducer, score);
  });
  score *= winningDrawnNumber;
  return score;
}

let boardsArr = convertBoardDataToArrays(boardData);
let winningBoard;
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
