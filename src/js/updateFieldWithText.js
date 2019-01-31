import store from 'store';
import HexFormat from 'hex-format';
import validateNumber from './validateNumber';

/**
 * Check if a variable is valid
 *
 * @param param - The variable to check.
 *
 * @returns {boolean} Returns `true` if its valid, else `false`.
 */
function isValid(param) {
  if (param || param === 0) {
    return true;
  }
  return false;
}

/**
 * Update the value of the field and update the store value.
 *
 * @param {Object} obj                - An object containing all parameters.
 * @param {string} obj.id             - The id of the field.
 * @param {string|boolean} obj.label  - The name of the label, if there is one.
 * @param {string} obj.color          - The new color value.
 * @param {string|number} obj.number  - The new number value.
 * @param {stirng|number} obj.current - The current value.
 * @param {sting|number} obj.max      - The maximum valid value.
 * @param {sting|number} obj.min      - The minimum valid value.
 *
 * @returns {number} Returns `obj.value` if its valid, else `obj.current`.
 */
export default function (obj) {
  let value;

  if (isValid(obj.color)) {
    value = new HexFormat().format(obj.color);
  } else if (isValid(obj.number)) {
    value = validateNumber(obj.number, obj.max, obj.min);
  }

  const label = obj.label;
  const id = obj.id;

  if (isValid(value)) {
    if (obj.color) {
      store.commit('updateColor', { id, value });
    } else if (obj.label) {
      store.commit('updateNumber', { id, label, value });
    } else {
      store.commit('updateRange', { id, value });
    }

    return value;
  }

  return obj.current;
}
