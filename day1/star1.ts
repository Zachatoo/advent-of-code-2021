import { data } from './data.js';

let increaseCount = 0;
data.forEach((x, i) => {
  if (i !== 0 && x > data[i - 1]) {
    increaseCount += 1;
  }
});
console.log(increaseCount);
