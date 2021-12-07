import { data } from './data.js';
import { LanternFish } from './lanternfish.js';

const DAYS = 80;

const fishSchool: LanternFish[] = [];

data.forEach((x) => {
  fishSchool.push(new LanternFish(x));
});

for (let i = 0; i < DAYS; ++i) {
  fishSchool.forEach((fish) => {
    const cycleWasReset = fish.stepCycle();
    if (cycleWasReset) {
      fishSchool.push(new LanternFish());
    }
  });
}

console.log(fishSchool.length);
