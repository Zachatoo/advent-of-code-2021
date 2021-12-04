import { data } from './data.js';

let increaseCount = 0;
data.forEach((x, i) => {
  if (i !== 0) {
    increaseCount += x > data[i - 1];
  }
});
console.log(increaseCount);