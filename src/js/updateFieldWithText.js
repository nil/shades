import store from 'store';
import HexFormat from 'hex-format';
import validateNumber from './validateNumber';

/**
 * Update the value of the field and update the store value.
 *
 * @param {Object} obj                - An object containing all parameters.
 * @param {string} obj.id             - The id of the field.
 * @param {string|boolean} obj.label  - The name of the label, if there is one.
 * @param {string} obj.color          - The new color value.
 * @param {string|number} obj.number  - The new number value.
 * @param {stirng|number} obj.current - The current value.
 *
 * @returns {number} Returns `obj.value` if its valid, else `obj.current`.
 */
export default function (obj) {
  let value;

  const label = obj.label;
  const id = obj.id;

  if (obj.color) {
    value = new HexFormat().format(obj.color);
  } else if (obj.number) {
    value = validateNumber(obj.number, store.state[id].range);
  }

  if (value || value === 0) {
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
