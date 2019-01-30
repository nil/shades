/**
 * Return a new value after pressing a key.
 *
 * @param {Object} obj        - An object containing all parameters.
 * @param {string} obj.number - The current number value of the field.
 * @param {number} obj.key    - The key code of the pressed key.
 * @param {boolean} obj.shift - Whether the shift key is pressed or not.
 *
 * @returns {number} Returns `obj.value` with the added or substracted value.
 */
export default function (obj) {
  const diff = 1 + obj.shift * 9;
  return obj.number + (obj.key === 'ArrowDown' ? -diff : diff);
}
