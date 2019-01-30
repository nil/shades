import color from 'color';

/**
 * Return a new value after pressing a key.
 *
 * @param {Object} obj        - An object containing all parameters.
 * @param {string} obj.color  - The current color value of the field.
 * @param {string} obj.number - The current number value of the field.
 * @param {number} obj.key    - The key code of the pressed key.
 * @param {boolean} obj.shift - Whether the shift key is pressed or not.
 *
 * @returns {number} Returns `obj.value` with the added or substracted value.
 */
export default function (obj) {
  const sign = obj.key === 'ArrowDown' ? -1 : 1;
  const diff = (1 + obj.shift * 9) * sign;

  if (obj.color) {
    const hsb = color(obj.color).hsv().round().object();

    return color({ h: hsb.h, s: hsb.s, v: hsb.v + diff }).hex();
  }

  return obj.number + diff;
}
