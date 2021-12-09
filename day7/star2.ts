import { data } from './data.js';

let leastFuelIndex: number;
let leastFuel = Infinity;

const maxNumber = Math.max(...data);
const minNumber = Math.min(...data);

function getDistance(value: number, targetValue: number) {
  if (value > targetValue) {
    return value - targetValue;
  }
  return targetValue - value;
}

function getFuelCost(distance: number) {
  return (Math.pow(distance, 2) + distance) / 2;
}

for (let i = minNumber; i <= maxNumber; ++i) {
  let totalFuel = 0;
  data.forEach((crabSub) => {
    const distance = getDistance(crabSub, i);
    totalFuel += getFuelCost(distance);
  });
  if (totalFuel < leastFuel) {
    leastFuelIndex = i;
    leastFuel = totalFuel;
  }
}

console.log(leastFuel);
