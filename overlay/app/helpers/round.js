import { helper } from '@ember/component/helper';

function round([num, places]) {
  if (num % 1 === 0) return num;
  
  return num.toFixed(places);
}

export default helper(round);
