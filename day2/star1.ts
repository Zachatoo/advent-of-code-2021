import { data } from './data.js';

let pos = {
  horizontal: 0,
  depth: 0,
};

data.forEach((x) => {
  const direction = x.split(' ')[0];
  const distance = +x.split(' ')[1];
  switch (direction) {
    case 'forward':
      pos = {
        ...pos,
        horizontal: pos.horizontal + distance,
      };
      break;
    case 'up':
      pos = {
        ...pos,
        depth: pos.depth - distance,
      };
      break;
    case 'down':
      pos = {
        ...pos,
        depth: pos.depth + distance,
      };
      break;
    default:
      console.error(`unknown direction: ${direction}`);
  }
});
console.log(pos.horizontal * pos.depth);
