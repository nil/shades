import math from 'string-math';

export default function (val, maximum = 99999, minimum = 0) {
  // Turn value into a string
  let number = String(val);

  // See if it contains any of the invalid characters
  const match = number.match(/([^\d,.+\-*/\u00D7\u00F7()]).*/g);

  // Turn maximum into a number
  const max = Number(maximum);
  const min = Number(minimum);

  if (number.length && !match) {
    // Do math operations
    number = math(number);

    // Smaller than minimum - return min
    if (number <= min) {
      return min;
    }

    // Greater than maximum - return max
    if (number >= max) {
      return max;
    }

    // Else - return number without decimals
    return Number(number.toFixed(0));
  }

  return false;
}
