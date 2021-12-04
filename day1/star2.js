import { data } from './data.js';

function getWindowedMeasurements (values) {
  let results = [];
  values.forEach((x, i) => {
    if (i < values.length - 2) {
      const sum = x + values[i + 1] + values[i + 2];
      results.push(sum);
    }
  });
  return results;
}

let increaseCount = 0;
const windowedMeasurements = getWindowedMeasurements(data);
windowedMeasurements.forEach((x, i) => {
  if (i !== 0) {
    increaseCount += x > windowedMeasurements[i - 1];
  }
});
console.log(increaseCount);