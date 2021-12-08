import { data } from './data.js';

function getMinMaxKeyFromObjectByValue(obj: object) {
  let min = Infinity;
  let minKey = '';
  let max = 0;
  let maxKey = '';
  for (let key in obj) {
    if (obj[key] < min) {
      min = obj[key];
      minKey = key;
    }
    if (obj[key] > max) {
      max = obj[key];
      maxKey = key;
    }
  }
  return [minKey, maxKey];
}

let gammaRateBits = '';
let espilonRateBits = '';
const maxBitIndex = data[0].length - 1;
for (let i = 0; i <= maxBitIndex; ++i) {
  const counts = {};
  data.forEach((x) => {
    if (counts[x[i]] === undefined) {
      counts[x[i]] = 1;
    } else {
      counts[x[i]] += 1;
    }
  });
  const [espilonRateBit, gammaRateBit] = getMinMaxKeyFromObjectByValue(counts);
  gammaRateBits += gammaRateBit;
  espilonRateBits += espilonRateBit;
}
const gammaRateDecimal = parseInt(gammaRateBits, 2);
const espilonRateDecimal = parseInt(espilonRateBits, 2);
const powerConsumption = gammaRateDecimal * espilonRateDecimal;
console.log(powerConsumption);
