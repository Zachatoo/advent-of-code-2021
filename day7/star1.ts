import { data } from './data.js';

let leastFuelIndex: number;
let leastFuel = Infinity;

const maxNumber = Math.max(...data);
const minNumber = Math.min(...data);

function getFuelCost(value: number, targetValue: number) {
  if (value > targetValue) {
    return value - targetValue;
  }
  return targetValue - value;
}

for (let i = minNumber; i <= maxNumber; ++i) {
  let totalFuel = 0;
  data.forEach((crabSub) => {
    totalFuel += getFuelCost(crabSub, i);
  });
  if (totalFuel < leastFuel) {
    leastFuelIndex = i;
    leastFuel = totalFuel;
  }
}

console.log(leastFuel);
