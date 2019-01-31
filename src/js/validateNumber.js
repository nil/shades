import math from 'string-math';

/**
 * Formats `val` and sets it in range.
 *
 * @param {string|number} val     - The value to check.
 * @param {string|number} maximum - The maximum valid value.
 * @param {string|number} minimum - The minimum valid value.
 *
 * @returns {number} Returns a formatted `val`.
 */
export default function (val, maximum = 99999, minimum = 0) {
  let number = String(val);

  const match = number.match(/([^\s\d,.+\-*/\u00D7\u00F7()]).*/g);
  const max = Number(maximum);
  const min = Number(minimum);

  if (number.length && !match) {
    number = math(number);

    if (number <= min) {
      return min;
    }

    if (number >= max) {
      return max;
    }

    return Number(number.toFixed(0));
  }

  return false;
}
