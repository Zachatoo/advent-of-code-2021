import { data } from './data.js';

const DAYS: number = 256;
const MAX_INTERNAL_CYCLE_INDEX: number = 8;
const RESET_INTERNAL_CYCLE_INDEX: number = 6;
const MIN_INTERNAL_CYCLE_INDEX: number = 0;

let cycles: number[] = Array(MAX_INTERNAL_CYCLE_INDEX + 1).fill(0);

data.forEach((x) => {
  cycles[x] += 1;
});

for (let dayIndex = 0; dayIndex < DAYS; ++dayIndex) {
  const newCycles = [...cycles];
  for (
    let cycleIndex = MAX_INTERNAL_CYCLE_INDEX;
    cycleIndex > MIN_INTERNAL_CYCLE_INDEX;
    --cycleIndex
  ) {
    newCycles[cycleIndex - 1] = cycles[cycleIndex];
  }
  newCycles[MAX_INTERNAL_CYCLE_INDEX] = cycles[0]; // reset cycle of fish that just finished their cycle
  newCycles[RESET_INTERNAL_CYCLE_INDEX] += cycles[0]; // create new fish
  cycles = newCycles;
}

const totalFish = cycles.reduce((prev, curr) => prev + curr, 0);
console.log(totalFish);
