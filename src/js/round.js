/**
 * Sets `value` between `min` and `max`, and rounds it.
 *
 * @param {number} value - The number to round.
 * @param {number} min   - The minimum value for the result.
 * @param {number} max   - The maximum value for the result.
 *
 * @returns {number} Returns the rounded number.
 */
export default function (value, min, max) {
  // Throw error if min or max are not integers
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw Error('min and max values for the range must be an integer');
  }

  if (value <= min) {
    return min;
  }

  if (value >= max) {
    return max;
  }

  const normalize = value - min;
  const decimal = Math.floor(normalize);
  const fraction = normalize - decimal;

  if (fraction === 0) {
    return value;
  }

  if (fraction < 0.5) {
    return decimal + min;
  }

  return decimal + 1 + min;
}
