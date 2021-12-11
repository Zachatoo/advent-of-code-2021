import { testData as data } from './data.js';

type Position = {
  row: number;
  column: number;
};

const MAX_STEPS: number = 10;
const MAX_ENERGY: number = 9;
const FLASH_NUMBER: number = -1;
let octopusData = [...data];
let totalFlashes = 0;

function isFlashed(value: number) {
  return value === FLASH_NUMBER;
}

function increaseEnergySingle(value: number) {
  if (value >= MAX_ENERGY || isFlashed(value)) {
    return FLASH_NUMBER;
  }
  return value + 1;
}

function increaseEnergyAll(dataArr: number[][]) {
  return dataArr.map((row) => row.map((entry) => increaseEnergySingle(entry)));
}

function increaseEnergyNeighbors(dataArr: number[][], position: Position) {
  const dataCopy = [...dataArr];
  const { row, column } = position;
  for (let i = row - 1; i <= row + 1; ++i) {
    if (isValidIndex(i, dataArr)) {
      for (let j = column - 1; i <= column + 1; ++j) {
        if (isValidIndex(j, dataArr[i])) {
          dataCopy[i][j] = increaseEnergySingle(dataCopy[i][j]);
        }
      }
    }
  }
  return dataCopy;
}

function isValidIndex(index: number, arr: number[][] | number[]) {
  return index >= 0 && index < arr.length;
}

function flashOctopi(dataArr: number[][]) {
  let dataCopy = [...dataArr];
  for (let row = 0; row < dataCopy.length; ++row) {
    for (let column = 0; column < dataCopy[row].length; ++column) {
      if (isFlashed(dataCopy[row][column])) {
        const position = { row, column };
        dataCopy = increaseEnergyNeighbors(dataArr, position);
      }
    }
  }
  return dataCopy;
}

function countFlashes(dataArr: number[][]) {
  const flatArr = dataArr.flat(2);
  return flatArr.reduce((prev, curr) => prev + +isFlashed(curr), 0);
}

function resetFlashes(dataArr: number[][]) {
  return dataArr.map((row) =>
    row.map((entry) => (isFlashed(entry) ? 0 : entry))
  );
}

for (let currStep = 0; currStep < MAX_STEPS; ++currStep) {
  console.log('step', currStep);
  const steppedData = increaseEnergyAll(octopusData);
  const flashedData = flashOctopi(steppedData);
  totalFlashes += countFlashes(octopusData);
  octopusData = resetFlashes(flashedData);
}
console.log(octopusData);
console.log(totalFlashes);
