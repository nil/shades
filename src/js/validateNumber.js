import math from 'string-math';

/**
 * Formats `val` and sets it in range.
 *
 * @param {string|number} val - The value to check.
 * @param {Object} obj        - The stored minimum and maximum values.
 *
 * @returns {number} Returns a formatted `val`.
 */
export default function (val, obj) {
  let number = String(val);
  let max = 999999;
  let min = 0;

  const match = number.match(/([^\d,.+\-*/\u00D7\u00F7()]).*/g);

  if (obj) {
    max = Number(obj.max) || max;
    min = Number(obj.min) || min;
  }

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
